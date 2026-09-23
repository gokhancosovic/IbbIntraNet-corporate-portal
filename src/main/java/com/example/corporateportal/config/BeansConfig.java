/*package com.example.corporateportal.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class BeansConfig {

    // 1. Standart/Varsayılan RestTemplate
    @Bean("defaultRestTemplate")
    @Primary // Bir Qualifier belirtilmezse varsayılan olarak bu enjekte edilir
    public RestTemplate defaultRestTemplate() {
        return new RestTemplate();
    }

    // 2. Dış servisler için özel yapılandırılmış (Timeout'lu) RestTemplate
    @Bean("externalServiceRestTemplate")
    public RestTemplate externalServiceRestTemplate(RestTemplateBuilder builder) {
        return builder
                .setConnectTimeout(Duration.ofSeconds(5))
                .setReadTimeout(Duration.ofSeconds(5))
                .build();
    }
}*/