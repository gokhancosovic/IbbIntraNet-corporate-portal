package com.example.corporateportal;

import com.example.corporateportal.entity.SliderItem;
import com.example.corporateportal.repository.SliderItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CorporatePortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(CorporatePortalApplication.class, args);
    }

    @Bean
    CommandLineRunner initSliders(SliderItemRepository sliderRepository) {
        return args -> {
            if (sliderRepository.count() == 0) {
                sliderRepository.save(SliderItem.builder()
                        .title("Kurumsal Portal Yayında")
                        .description("İç iletişim ve süreç yönetimini tek çatı altında topluyoruz.")
                        .imageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80")
                        .targetUrl("/kurumsal")
                        .displayOrder(1)
                        .isActive(true)
                        .build());

                sliderRepository.save(SliderItem.builder()
                        .title("Yeni Nesil Hizmet İçi Eğitimler Başlıyor")
                        .description("Yapay zeka ve dijital dönüşüm atölyelerine kayıtlar açıldı.")
                        .imageUrl("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80")
                        .targetUrl("/duyurular")
                        .displayOrder(2)
                        .isActive(true)
                        .build());

                System.out.println(">>> ÖRNEK SLIDER KAYITLARI EKLENDI <<<");
            }
        };
    }
}