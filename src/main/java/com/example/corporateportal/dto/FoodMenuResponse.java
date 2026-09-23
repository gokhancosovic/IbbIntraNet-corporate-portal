package com.example.corporateportal.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class FoodMenuResponse {
    private Long id;
    private LocalDate menuDate;
    private String soup;
    private String mainCourse;
    private String sideDish;
    private String dessertOrDrink;
}