package com.example.corporateportal.repository;

import com.example.corporateportal.entity.SliderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SliderItemRepository extends JpaRepository<SliderItem, Long> {
    List<SliderItem> findByIsActiveTrueOrderByDisplayOrderAsc();
}