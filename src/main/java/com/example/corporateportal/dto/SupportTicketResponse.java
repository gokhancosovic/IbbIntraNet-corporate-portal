package com.example.corporateportal.dto;

import com.example.corporateportal.entity.SupportTicket;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SupportTicketResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private SupportTicket.TicketStatus status;
    private String adminNote;
    private String createdByUsername;
    private String createdByFullName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static SupportTicketResponse fromEntity(SupportTicket ticket) {
        String fullName = ticket.getUser() != null
                ? (ticket.getUser().getFirstName() + " " + ticket.getUser().getLastName()).trim()
                : "Bilinmiyor";

        return SupportTicketResponse.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .description(ticket.getDescription())
                .category(ticket.getCategory())
                .status(ticket.getStatus())
                .adminNote(ticket.getAdminNote())
                .createdByUsername(ticket.getUser() != null ? ticket.getUser().getUsername() : null)
                .createdByFullName(fullName)
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .build();
    }
}