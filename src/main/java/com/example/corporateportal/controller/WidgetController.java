package com.example.corporateportal.controller;

import com.example.corporateportal.dto.ExchangeRateDto;
import com.example.corporateportal.dto.WeatherResponse;
import com.example.corporateportal.service.ExchangeRateService;
import com.example.corporateportal.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/widgets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WidgetController {

    private final ExchangeRateService exchangeRateService;
    private final WeatherService weatherService;

    @GetMapping("/exchange-rates")
    public ResponseEntity<ExchangeRateDto> getExchangeRates() {
        return ResponseEntity.ok(exchangeRateService.getExchangeRates());
    }

    @GetMapping("/weather")
    public ResponseEntity<WeatherResponse> getWeather() {
        return ResponseEntity.ok(weatherService.getIstanbulWeather());
    }
}