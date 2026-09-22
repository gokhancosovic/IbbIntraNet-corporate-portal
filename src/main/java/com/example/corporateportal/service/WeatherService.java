package com.example.corporateportal.service;

import com.example.corporateportal.dto.WeatherResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class WeatherService {

    private final RestTemplate restTemplate = new RestTemplate();

    // Istanbul koordinatları: 41.0082, 28.9784
    private static final String WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,weather_code";

    public WeatherResponse getIstanbulWeather() {
        try {
            Map<String, Object> response = restTemplate.getForObject(WEATHER_URL, Map.class);
            if (response != null && response.containsKey("current")) {
                Map<String, Object> current = (Map<String, Object>) response.get("current");
                double temp = ((Number) current.get("temperature_2m")).doubleValue();
                int code = ((Number) current.get("weather_code")).intValue();

                return WeatherResponse.builder()
                        .city("İstanbul")
                        .temperature(temp)
                        .description(decodeWeather(code))
                        .build();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return WeatherResponse.builder()
                .city("İstanbul")
                .temperature(0.0)
                .description("Bilinmiyor")
                .build();
    }

    private String decodeWeather(int code) {
        return switch (code) {
            case 0 -> "Açık";
            case 1, 2, 3 -> "Parçalı Bulutlu";
            case 45, 48 -> "Sisli";
            case 51, 53, 55, 61, 63, 65, 80, 81, 82 -> "Yağmurlu";
            case 71, 73, 75, 85, 86 -> "Karlı";
            case 95, 96, 99 -> "Fırtına";
            default -> "Bulutlu";
        };
    }
}