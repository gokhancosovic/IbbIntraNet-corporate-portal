package com.example.corporateportal.service;

import com.example.corporateportal.dto.CreateReservationRequest;
import com.example.corporateportal.dto.MeetingReservationResponse;
import com.example.corporateportal.entity.MeetingReservation;
import com.example.corporateportal.entity.ReservationStatus;
import com.example.corporateportal.entity.User;
import com.example.corporateportal.repository.MeetingReservationRepository;
import com.example.corporateportal.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingReservationService {

    private final MeetingReservationRepository reservationRepository;
    private final UserRepository userRepository;

    @Transactional
    public MeetingReservationResponse createReservation(CreateReservationRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        MeetingReservation reservation = MeetingReservation.builder()
                .title(request.getTitle())
                .roomName(request.getRoomName())
                .reservationDate(request.getReservationDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .participantCount(request.getParticipantCount())
                .status(ReservationStatus.PENDING)
                .requester(user)
                .build();

        return MeetingReservationResponse.fromEntity(reservationRepository.save(reservation));
    }

    public List<MeetingReservationResponse> getMyReservations(String username) {
        return reservationRepository.findByRequesterUsernameOrderByReservationDateDesc(username)
                .stream().map(MeetingReservationResponse::fromEntity).toList();
    }

    public List<MeetingReservationResponse> getAllReservations() {
        return reservationRepository.findAllByOrderByReservationDateDesc()
                .stream().map(MeetingReservationResponse::fromEntity).toList();
    }

    @Transactional
    public MeetingReservationResponse updateStatus(Long id, ReservationStatus status, String adminNote) {
        MeetingReservation res = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rezervasyon bulunamadı"));

        res.setStatus(status);
        if (adminNote != null) res.setAdminNote(adminNote);

        return MeetingReservationResponse.fromEntity(reservationRepository.save(res));
    }
}