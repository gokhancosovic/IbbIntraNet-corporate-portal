package com.example.corporateportal.repository;

import com.example.corporateportal.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findAllByIsActiveTrueOrderByPublishAtDesc();
}