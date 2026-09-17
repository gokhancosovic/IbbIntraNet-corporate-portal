package com.example.corporateportal.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class DepartmentResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
}