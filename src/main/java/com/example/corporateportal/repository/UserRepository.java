package com.example.corporateportal.repository;

import com.example.corporateportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    // Zaten eklediğimiz metod
    Optional<User> findByUsername(String username);

    // Eksik olan ve UserService'in aradığı metodlar
    List<User> findAllByIsActiveTrue();

    Optional<User> findByIdAndIsActiveTrue(Long id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}