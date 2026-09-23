package com.example.corporateportal.dto;

import com.example.corporateportal.entity.SupportTicket;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTicketStatusRequest {
    @NotNull(message = "Durum zorunludur")
    private SupportTicket.TicketStatus status;

    private String adminNote;
}