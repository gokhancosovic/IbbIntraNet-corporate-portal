package com.example.corporateportal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/all")
    public ResponseEntity<String> allAccess() {
        return ResponseEntity.ok("Giriş yapmış tüm kullanıcılar bu endpoint'i görebilir.");
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminAccess() {
        return ResponseEntity.ok("Yalnızca ADMIN rolüne sahip kullanıcılar bu mesajı görebilir.");
    }
}