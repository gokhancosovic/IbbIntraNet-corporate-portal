package com.example.corporateportal.controller;

import com.example.corporateportal.dto.CreateTicketRequest;
import com.example.corporateportal.dto.SupportTicketResponse;
import com.example.corporateportal.dto.UpdateTicketStatusRequest;
import com.example.corporateportal.service.SupportTicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SupportTicketController {

    private final SupportTicketService ticketService;

    // Normal kullanıcı veya Admin: Yeni talep oluşturma
    @PostMapping
    public ResponseEntity<SupportTicketResponse> createTicket(@Valid @RequestBody CreateTicketRequest request,
                                                              Authentication authentication) {
        return ResponseEntity.ok(ticketService.createTicket(request, authentication.getName()));
    }

    // Normal kullanıcı: Sadece kendi taleplerini görme
    @GetMapping("/my-tickets")
    public ResponseEntity<List<SupportTicketResponse>> getMyTickets(Authentication authentication) {
        return ResponseEntity.ok(ticketService.getMyTickets(authentication.getName()));
    }

    // Sadece Admin: Tüm personelden gelen talepleri görme
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SupportTicketResponse>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    // Sadece Admin: Talebin durumunu güncelleme (Çözüldü/Reddedildi + Not)
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupportTicketResponse> updateStatus(@PathVariable Long id,
                                                              @Valid @RequestBody UpdateTicketStatusRequest request) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(id, request));
    }
}