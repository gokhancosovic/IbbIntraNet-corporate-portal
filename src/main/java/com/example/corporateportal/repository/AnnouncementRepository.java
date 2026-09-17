package com.example.corporateportal.repository;

import com.example.corporateportal.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    // Aktif duyuruları sabitlenenler (pinned) en üstte olacak şekilde getir
    List<Announcement> findByIsActiveTrueOrderByIsPinnedDescCreatedAtDesc();
}