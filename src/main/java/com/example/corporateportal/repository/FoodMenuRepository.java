package com.example.corporateportal.repository;

import com.example.corporateportal.entity.FoodMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface FoodMenuRepository extends JpaRepository<FoodMenu, Long> {

    // Belirli bir tarihe ait menüyü getirir
    Optional<FoodMenu> findByMenuDate(LocalDate menuDate);

    // Belirtilen tarihte zaten kayıt var mı kontrolü (Admin eklerken kullanılır)
    boolean existsByMenuDate(LocalDate menuDate);

    // Veritabanına girilmiş EN SON menüyü getirir (Fallback için)
    Optional<FoodMenu> findTopByOrderByMenuDateDesc();
}