package com.example.corporateportal.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateLeaveRequest {


    @NotNull(message = "Başlangıç tarihi zorunludur")
    @FutureOrPresent(message = "Başlangıç tarihi bugünden önce olamaz")
    private LocalDate startDate;

    @NotNull(message = "Bitiş tarihi zorunludur")
    private LocalDate endDate;

    @Size(max = 500, message = "Açıklama en fazla 500 karakter olabilir")
    private String reason;
}