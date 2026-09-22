package com.example.corporateportal.controller;

import com.example.corporateportal.dto.NewsCreateRequest;
import com.example.corporateportal.dto.NewsResponse;
import com.example.corporateportal.entity.News;
import com.example.corporateportal.entity.User;
import com.example.corporateportal.repository.NewsRepository;
import com.example.corporateportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class NewsController {

    private final NewsRepository newsRepository;
    private final UserRepository userRepository;

    // Herkes (Giriş yapan USER ve ADMIN) haberleri görebilir
    @GetMapping
    public ResponseEntity<List<NewsResponse>> getAllNews() {
        List<NewsResponse> response = newsRepository.findAllByIsActiveTrueOrderByPublishAtDesc()
                .stream()
                .map(news -> NewsResponse.builder()
                        .id(news.getId())
                        .title(news.getTitle())
                        .summary(news.getSummary())
                        .content(news.getContent())
                        .imageUrl(news.getImageUrl())
                        .authorFullName(news.getAuthor() != null ?
                                (news.getAuthor().getFirstName() + " " + news.getAuthor().getLastName()) : "Sistem")
                        .publishAt(news.getPublishAt())
                        .build())
                .toList();

        return ResponseEntity.ok(response);
    }

    // Sadece ADMIN yeni haber ekleyebilir
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createNews(@RequestBody NewsCreateRequest request,
                                        @AuthenticationPrincipal UserDetails userDetails) {
        User author = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        News news = News.builder()
                .title(request.getTitle())
                .summary(request.getSummary())
                .content(request.getContent())
                .imageUrl(request.getImageUrl())
                .isActive(true)
                .publishAt(LocalDateTime.now())
                .author(author)
                .build();

        newsRepository.save(news);
        return ResponseEntity.ok("Haber başarıyla yayınlandı");
    }

    // Sadece ADMIN haberi silebilir (veya pasife çekebilir)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Haber bulunamadı"));

        // Veritabanından tamamen silmek yerine pasife çekmek kurumsal mimaride daha güvenlidir:
        news.setIsActive(false);
        newsRepository.save(news);

        return ResponseEntity.ok("Haber silindi");
    }
}