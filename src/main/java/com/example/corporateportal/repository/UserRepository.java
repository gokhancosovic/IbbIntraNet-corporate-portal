package com.example.corporateportal.repository;

import com.example.corporateportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Kullanıcı adına göre kullanıcıyı getir (Login için gerekecek)
    Optional<User> findByUsername(String username);

    // Email adresine göre kullanıcıyı getir
    Optional<User> findByEmail(String email);

    // Kayıt olurken veya yeni personel eklerken aynı kullanıcı adı var mı kontrolü
    boolean existsByUsername(String username);

    // Aynı email sistemde zaten kayıtlı mı kontrolü
    boolean existsByEmail(String email);
    List<User> findAllByIsActiveTrue();
    Optional<User> findByIdAndIsActiveTrue(Long id);
}
