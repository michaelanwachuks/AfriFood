package com.afrifood.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.afrifood.app.dto.AuthUserResponse;
import com.afrifood.app.dto.LoginRequest;
import com.afrifood.app.dto.RegisterRequest;
import com.afrifood.app.entity.UserEntity;
import com.afrifood.app.repository.UserRepository;
import com.afrifood.app.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173") // Allow requests from any origin
public class UserController {
    //inject the UserService
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request)   {
       return ResponseEntity.ok(userService.registerUser(request));    
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request, HttpServletResponse response) {
        try {
            UserEntity user = userService.loginUser(request.getEmail(), request.getPassword(), request, response);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/auth/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        UserEntity user = userRepository.findByEmail(authentication.getName());
        if (user == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        return ResponseEntity.ok(new AuthUserResponse(user.getId(), user.getName(), user.getEmail()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out");
    }
}

