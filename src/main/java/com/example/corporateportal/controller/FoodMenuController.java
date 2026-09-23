package com.example.corporateportal.controller;

import com.example.corporateportal.dto.CreateFoodMenuRequest;
import com.example.corporateportal.dto.FoodMenuResponse;
import com.example.corporateportal.dto.UpdateFoodMenuRequest;
import com.example.corporateportal.service.FoodMenuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/food-menus")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FoodMenuController {

    private final FoodMenuService foodMenuService;

    /**
     * Giriş yapmış tüm personeller bugünün menüsünü görüntüler.
     * Tarih parametresi almaz, manipülasyona kapalıdır.
     */
    @GetMapping("/today")
    public ResponseEntity<FoodMenuResponse> getTodayMenu() {
        return ResponseEntity.ok(foodMenuService.getTodayMenu());
    }

    /**
     * Sadece ADMIN yetkisi olan kullanıcılar yeni menü ekleyebilir.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FoodMenuResponse> createMenu(@Valid @RequestBody CreateFoodMenuRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(foodMenuService.createMenu(request));
    }

    /**
     * Sadece ADMIN yetkisi olan kullanıcılar menü güncelleyebilir.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FoodMenuResponse> updateMenu(
            @PathVariable Long id,
            @Valid @RequestBody UpdateFoodMenuRequest request
    ) {
        return ResponseEntity.ok(foodMenuService.updateMenu(id, request));
    }

    /**
     * Sadece ADMIN yetkisi olan kullanıcılar menü silebilir.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        foodMenuService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }
}