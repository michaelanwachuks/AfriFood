package com.afrifoodApp.controller;

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

import com.afrifoodApp.dto.LoginRequest;
import com.afrifoodApp.dto.RegisterRequest;
import com.afrifoodApp.entity.UserEntity;
import com.afrifoodApp.services.UserService;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173") // Allow requests from any origin
public class UserController {
    //inject the UserService
    @Autowired
    UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request)   {
       return ResponseEntity.ok(userService.registerUser(request));    
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request,  HttpServletResponse response) {
       UserEntity user = userService.loginUser(request.getEmail(), request.getPassword(), request, response);
      
        return ResponseEntity.ok(user);
    }

    @GetMapping("/auth/me")
   public ResponseEntity<?> getCurrentUser(Authentication authentication) {

    if (authentication == null || !authentication.isAuthenticated()) {
        return ResponseEntity.status(401).body("Not logged in");
    }

    return ResponseEntity.ok(authentication.getPrincipal());
}
    



}

