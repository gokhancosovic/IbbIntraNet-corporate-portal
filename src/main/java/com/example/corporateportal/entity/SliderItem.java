package com.example.corporateportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "slider_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SliderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private String imageUrl;

    private String targetUrl; // Tıklandığında gideceği iç/dış bağlantı

    private Integer displayOrder; // Slayt sırası (1, 2, 3...)

    @Builder.Default
    private Boolean isActive = true;
}