package com.example.corporateportal.exception;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message); // Hata mesajını ata sınıf olan RuntimeException'a iletiyoruz
    }
}