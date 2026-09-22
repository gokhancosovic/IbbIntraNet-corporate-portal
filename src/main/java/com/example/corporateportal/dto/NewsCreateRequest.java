package com.example.corporateportal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsCreateRequest {
    private String title;
    private String summary;
    private String content;
    private String imageUrl;
}