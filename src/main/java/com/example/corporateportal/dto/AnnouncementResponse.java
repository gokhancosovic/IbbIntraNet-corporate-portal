package com.example.corporateportal.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class AnnouncementResponse {
    private Long id;
    private String title;
    private String content;
    private Boolean isPinned;
    private Boolean isActive;
    private String authorFullName;
    private LocalDateTime publishAt;
    private LocalDateTime createdAt;
}