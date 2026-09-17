package com.example.corporateportal.service;

import com.example.corporateportal.dto.AnnouncementResponse;
import com.example.corporateportal.dto.CreateAnnouncementRequest;
import com.example.corporateportal.entity.Announcement;
import com.example.corporateportal.entity.User;
import com.example.corporateportal.repository.AnnouncementRepository;
import com.example.corporateportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<AnnouncementResponse> getAllActiveAnnouncements() {
        return announcementRepository.findByIsActiveTrueOrderByIsPinnedDescCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public AnnouncementResponse createAnnouncement(CreateAnnouncementRequest request, String username) {
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Yazar bulunamadı: " + username));

        Announcement announcement = Announcement.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .isPinned(request.getIsPinned() != null ? request.getIsPinned() : false)
                .isActive(true)
                .author(author)
                .publishAt(request.getPublishAt() != null ? request.getPublishAt() : LocalDateTime.now())
                .build();

        announcement.setCreatedBy(username);
        announcement.setUpdatedBy(username);

        Announcement saved = announcementRepository.save(announcement);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteAnnouncement(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Duyuru bulunamadı: " + id));
        announcement.setIsActive(false);
        announcementRepository.save(announcement);
    }

    private AnnouncementResponse mapToResponse(Announcement announcement) {
        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .content(announcement.getContent())
                .isPinned(announcement.getIsPinned())
                .isActive(announcement.getIsActive())
                .authorFullName(announcement.getAuthor().getFirstName() + " " + announcement.getAuthor().getLastName())
                .publishAt(announcement.getPublishAt())
                .createdAt(announcement.getCreatedAt())
                .build();
    }
}