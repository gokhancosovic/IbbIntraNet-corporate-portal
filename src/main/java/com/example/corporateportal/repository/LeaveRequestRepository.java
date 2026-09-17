package com.example.corporateportal.repository;

import com.example.corporateportal.entity.LeaveRequest;
import com.example.corporateportal.entity.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<LeaveRequest> findByStatusOrderByCreatedAtDesc(LeaveStatus status);
}