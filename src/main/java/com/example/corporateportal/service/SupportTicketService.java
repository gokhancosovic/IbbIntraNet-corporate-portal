package com.example.corporateportal.service;

import com.example.corporateportal.dto.CreateTicketRequest;
import com.example.corporateportal.dto.SupportTicketResponse;
import com.example.corporateportal.dto.UpdateTicketStatusRequest;
import com.example.corporateportal.entity.SupportTicket;
import com.example.corporateportal.entity.User;
import com.example.corporateportal.repository.SupportTicketRepository;
import com.example.corporateportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupportTicketService {

    private final SupportTicketRepository ticketRepository;
    private final UserRepository userRepository;

    @Transactional
    public SupportTicketResponse createTicket(CreateTicketRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + username));

        SupportTicket ticket = SupportTicket.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .user(user)
                .status(SupportTicket.TicketStatus.PENDING)
                .build();

        return SupportTicketResponse.fromEntity(ticketRepository.save(ticket));
    }

    public List<SupportTicketResponse> getAllTickets() {
        return ticketRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(SupportTicketResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<SupportTicketResponse> getMyTickets(String username) {
        return ticketRepository.findByUser_UsernameOrderByCreatedAtDesc(username)
                .stream()
                .map(SupportTicketResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public SupportTicketResponse updateTicketStatus(Long id, UpdateTicketStatusRequest request) {
        SupportTicket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Talep bulunamadı: " + id));

        ticket.setStatus(request.getStatus());
        if (request.getAdminNote() != null) {
            ticket.setAdminNote(request.getAdminNote());
        }

        return SupportTicketResponse.fromEntity(ticketRepository.save(ticket));
    }
}