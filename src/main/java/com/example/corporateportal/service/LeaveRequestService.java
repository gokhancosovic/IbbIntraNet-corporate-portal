package com.example.corporateportal.service;

import com.example.corporateportal.dto.CreateLeaveRequest;
import com.example.corporateportal.dto.LeaveRequestResponse;
import com.example.corporateportal.entity.LeaveRequest;
import com.example.corporateportal.entity.LeaveStatus;
import com.example.corporateportal.entity.User;
import com.example.corporateportal.repository.LeaveRequestRepository;
import com.example.corporateportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final UserRepository userRepository;

    @Transactional
    public LeaveRequestResponse createLeaveRequest(CreateLeaveRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Kullanıcı bulunamadı: " + username));

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new IllegalArgumentException("Bitiş tarihi başlangıç tarihinden önce olamaz.");
        }

        LeaveRequest leaveRequest = LeaveRequest.builder()
                .user(user)
                .leaveType(request.getLeaveType())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .reason(request.getReason())
                .status(LeaveStatus.PENDING)
                .build();

        leaveRequest.setCreatedBy(username);
        leaveRequest.setUpdatedBy(username);

        LeaveRequest saved = leaveRequestRepository.save(leaveRequest);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<LeaveRequestResponse> getMyLeaveRequests(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Kullanıcı bulunamadı: " + username));

        return leaveRequestRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LeaveRequestResponse> getPendingRequests() {
        return leaveRequestRepository.findByStatusOrderByCreatedAtDesc(LeaveStatus.PENDING).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public LeaveRequestResponse approveLeaveRequest(Long requestId, String approverUsername) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("İzin talebi bulunamadı: " + requestId));

        if (leaveRequest.getStatus() != LeaveStatus.PENDING) {
            throw new IllegalStateException("Sadece beklemedeki talepler onaylanabilir.");
        }

        User approver = userRepository.findByUsername(approverUsername)
                .orElseThrow(() -> new IllegalArgumentException("Onaylayan kullanıcı bulunamadı: " + approverUsername));

        leaveRequest.setStatus(LeaveStatus.APPROVED);
        leaveRequest.setApprovedBy(approver);
        leaveRequest.setUpdatedBy(approverUsername);

        return mapToResponse(leaveRequestRepository.save(leaveRequest));
    }

    @Transactional
    public LeaveRequestResponse rejectLeaveRequest(Long requestId, String reason, String approverUsername) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("İzin talebi bulunamadı: " + requestId));

        if (leaveRequest.getStatus() != LeaveStatus.PENDING) {
            throw new IllegalStateException("Sadece beklemedeki talepler reddedilebilir.");
        }

        User approver = userRepository.findByUsername(approverUsername)
                .orElseThrow(() -> new IllegalArgumentException("Onaylayan kullanıcı bulunamadı: " + approverUsername));

        leaveRequest.setStatus(LeaveStatus.REJECTED);
        leaveRequest.setRejectionReason(reason);
        leaveRequest.setApprovedBy(approver);
        leaveRequest.setUpdatedBy(approverUsername);

        return mapToResponse(leaveRequestRepository.save(leaveRequest));
    }

    private LeaveRequestResponse mapToResponse(LeaveRequest lr) {
        String approverName = lr.getApprovedBy() != null
                ? lr.getApprovedBy().getFirstName() + " " + lr.getApprovedBy().getLastName()
                : null;

        return LeaveRequestResponse.builder()
                .id(lr.getId())
                .userId(lr.getUser().getId())
                .userFullName(lr.getUser().getFirstName() + " " + lr.getUser().getLastName())
                .leaveType(lr.getLeaveType())
                .status(lr.getStatus())
                .startDate(lr.getStartDate())
                .endDate(lr.getEndDate())
                .reason(lr.getReason())
                .rejectionReason(lr.getRejectionReason())
                .approvedByName(approverName)
                .createdAt(lr.getCreatedAt())
                .build();
    }
}