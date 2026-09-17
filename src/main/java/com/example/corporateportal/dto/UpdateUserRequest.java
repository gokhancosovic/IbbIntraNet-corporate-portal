package com.example.corporateportal.dto;

import com.example.corporateportal.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserRequest {

    @NotBlank(message = "Ad alanı boş bırakılamaz")
    private String firstName;

    @NotBlank(message = "Soyad alanı boş bırakılamaz")
    private String lastName;

    @NotBlank(message = "E-posta adresi boş bırakılamaz")
    @Email(message = "Geçerli bir e-posta formatı giriniz")
    private String email;

    @NotNull(message = "Rol belirtilmelidir")
    private Role role;

    @NotNull(message = "Aktiflik durumu belirtilmelidir")
    private Boolean isActive;
    private Long departmentId;
}