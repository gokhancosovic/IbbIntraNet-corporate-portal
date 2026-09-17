package com.example.corporateportal.controller;

import com.example.corporateportal.dto.CreateLeaveRequest;
import com.example.corporateportal.dto.LeaveRequestResponse;
import com.example.corporateportal.service.LeaveRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    // Kullanıcı kendi izin talebini oluşturur
    @PostMapping
    public ResponseEntity<LeaveRequestResponse> createLeaveRequest(
            @Valid @RequestBody CreateLeaveRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        LeaveRequestResponse response = leaveRequestService.createLeaveRequest(request, userDetails.getUsername());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Kullanıcı kendi geçmiş izin taleplerini listeler
    @GetMapping("/my")
    public ResponseEntity<List<LeaveRequestResponse>> getMyLeaveRequests(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(leaveRequestService.getMyLeaveRequests(userDetails.getUsername()));
    }

    // Sadece ADMIN veya MANAGER bekleyen talepleri görür
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<LeaveRequestResponse>> getPendingRequests() {
        return ResponseEntity.ok(leaveRequestService.getPendingRequests());
    }

    // Bekleyen talebi onayla
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LeaveRequestResponse> approveLeaveRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(leaveRequestService.approveLeaveRequest(id, userDetails.getUsername()));
    }

    // Bekleyen talebi reddet (Gövdede ret sebebi gönderilir)
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LeaveRequestResponse> rejectLeaveRequest(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        String reason = body.getOrDefault("reason", "Belirtilmedi");
        return ResponseEntity.ok(leaveRequestService.rejectLeaveRequest(id, reason, userDetails.getUsername()));
    }
}