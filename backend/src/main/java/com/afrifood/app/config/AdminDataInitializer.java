package com.afrifood.app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.afrifood.app.entity.Role;
import com.afrifood.app.entity.UserEntity;
import com.afrifood.app.repository.UserRepository;

@Component
public class AdminDataInitializer implements CommandLineRunner {

    @Value("${app.admin.email:admin@afrifood.com}")
    private String adminEmail;

    @Value("${app.admin.password:Admin@12345}")
    private String adminPassword;

    @Value("${app.admin.name:AfriFood Admin}")
    private String adminName;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminDataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        UserEntity admin = userRepository.findByEmail(adminEmail);

        if (admin == null) {
            admin = new UserEntity();
            admin.setName(adminName);
            admin.setEmail(adminEmail);
            admin.setPhone("0000000000");
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println("Default admin account created: " + adminEmail);
        } else if (admin.getRole() != Role.ADMIN) {
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println("Existing user promoted to admin: " + adminEmail);
        }
    }
}
