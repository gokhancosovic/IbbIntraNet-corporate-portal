package com.example.corporateportal.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "food_menus", uniqueConstraints = {
        @UniqueConstraint(name = "uk_food_menus_date", columnNames = "menu_date")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Menünün sunulacağı tarih (örn: 2026-09-22)
    @Column(name = "menu_date", nullable = false)
    private LocalDate menuDate;

    @Column(nullable = false, length = 100)
    private String soup;

    @Column(name = "main_course", nullable = false, length = 100)
    private String mainCourse;

    @Column(name = "side_dish", nullable = false, length = 100)
    private String sideDish;

    @Column(name = "dessert_or_drink", nullable = false, length = 100)
    private String dessertOrDrink;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}