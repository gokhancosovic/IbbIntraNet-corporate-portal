package com.example.corporateportal.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "news")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class News extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 500)
    private String summary; // Ön yüzde kartta veya manşette görünecek kısa özet

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // Haberin detaylı metni

    @Column(name = "image_url", length = 500)
    private String imageUrl; // Kapak görseli linki

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(name = "publish_at")
    private LocalDateTime publishAt;

    @PrePersist
    protected void onPrePersist() {
        if (this.publishAt == null) {
            this.publishAt = LocalDateTime.now();
        }
    }
}