package com.example.corporateportal.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class LeaveRequestResponse {
    private Long id;
    private Long userId;
    private String userFullName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private String rejectionReason;
    private String approvedByName;
    private LocalDateTime createdAt;
}