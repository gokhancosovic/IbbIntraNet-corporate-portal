package com.example.corporateportal.controller;

import com.example.corporateportal.dto.CreateReservationRequest;
import com.example.corporateportal.dto.MeetingReservationResponse;
import com.example.corporateportal.service.MeetingReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MeetingReservationController {

    private final MeetingReservationService reservationService;

    @PostMapping
    public ResponseEntity<MeetingReservationResponse> createReservation(
            @Valid @RequestBody CreateReservationRequest request,
            Authentication authentication
    ) {
        String username = authentication != null ? authentication.getName() : "anonymous";
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reservationService.createReservation(request, username));
    }

    @GetMapping("/my")
    public ResponseEntity<List<MeetingReservationResponse>> getMyReservations(Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "anonymous";
        return ResponseEntity.ok(reservationService.getMyReservations(username));
    }

    @GetMapping
    public ResponseEntity<List<MeetingReservationResponse>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }
}