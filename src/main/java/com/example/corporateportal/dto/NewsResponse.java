package com.example.corporateportal.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NewsResponse {
    private Long id;
    private String title;
    private String summary;
    private String content;
    private String imageUrl;
    private String authorFullName;
    private LocalDateTime publishAt;
}