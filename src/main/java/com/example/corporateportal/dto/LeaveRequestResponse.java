package com.example.corporateportal.dto;

import com.example.corporateportal.entity.LeaveStatus;
import com.example.corporateportal.entity.LeaveType;
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
    private LeaveType leaveType;
    private LeaveStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private String rejectionReason;
    private String approvedByName;
    private LocalDateTime createdAt;
}