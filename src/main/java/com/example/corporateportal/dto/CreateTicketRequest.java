package com.example.corporateportal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTicketRequest {
    @NotBlank(message = "Başlık zorunludur")
    private String title;

    @NotBlank(message = "Açıklama zorunludur")
    private String description;

    @NotBlank(message = "Kategori zorunludur")
    private String category;
}