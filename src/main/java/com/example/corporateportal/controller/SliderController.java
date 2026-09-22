package com.example.corporateportal.controller;

import com.example.corporateportal.entity.SliderItem;
import com.example.corporateportal.repository.SliderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sliders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SliderController {

    private final SliderItemRepository sliderItemRepository;

    @GetMapping
    public ResponseEntity<List<SliderItem>> getActiveSliders() {
        return ResponseEntity.ok(sliderItemRepository.findByIsActiveTrueOrderByDisplayOrderAsc());
    }
}