package com.example.corporateportal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentRequest {

    @NotBlank(message = "Departman adı boş bırakılamaz")
    @Size(max = 100, message = "Departman adı en fazla 100 karakter olabilir")
    private String name;

    @Size(max = 255, message = "Açıklama en fazla 255 karakter olabilir")
    private String description;
}