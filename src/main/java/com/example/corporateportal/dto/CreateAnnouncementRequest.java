package com.example.corporateportal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateAnnouncementRequest {

    @NotBlank(message = "Başlık boş bırakılamaz")
    @Size(max = 150, message = "Başlık en fazla 150 karakter olabilir")
    private String title;

    @NotBlank(message = "İçerik boş bırakılamaz")
    private String content;

    private Boolean isPinned = false;

    private LocalDateTime publishAt;
}