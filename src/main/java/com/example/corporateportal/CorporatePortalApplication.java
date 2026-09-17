package com.example.corporateportal;

import com.example.corporateportal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CorporatePortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(CorporatePortalApplication.class, args);
    }

//    @Bean
//    public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        return args -> {
//            userRepository.findByUsername("admin").ifPresent(admin -> {
//                admin.setPassword(passwordEncoder.encode("Admin123!"));
//                admin.setIsActive(true);
//                userRepository.save(admin);
//                System.out.println(">>> ADMIN SIFRESI BASARIYLA ENCODE EDILDI VE GUNCELLENDI <<<");
//            });
//        };
  //  }
}