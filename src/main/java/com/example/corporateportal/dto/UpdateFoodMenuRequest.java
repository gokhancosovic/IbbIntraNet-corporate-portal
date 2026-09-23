package com.example.corporateportal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateFoodMenuRequest {

    @NotNull(message = "Menü tarihi boş bırakılamaz")
    private LocalDate menuDate;

    @NotBlank(message = "Çorba alanı boş bırakılamaz")
    private String soup;

    @NotBlank(message = "Ana yemek alanı boş bırakılamaz")
    private String mainCourse;

    @NotBlank(message = "Yardımcı yemek alanı boş bırakılamaz")
    private String sideDish;

    @NotBlank(message = "Tatlı veya içecek alanı boş bırakılamaz")
    private String dessertOrDrink;
}