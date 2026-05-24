package com.afrifood.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.afrifood.app.config.JwtUtil;
import com.afrifood.app.dto.LoginRequest;
import com.afrifood.app.dto.RegisterRequest;
import com.afrifood.app.entity.UserEntity;
import com.afrifood.app.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Transactional
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserEntity registerUser(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        UserEntity user = new UserEntity();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(request.getPassword()));

        return userRepository.save(user);
    }

    public UserEntity loginUser(String email, String password, LoginRequest request, HttpServletResponse response) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = JwtUtil.generateToken(user.getEmail());
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(86400);
        response.addCookie(cookie);

        return user;
    }
}
