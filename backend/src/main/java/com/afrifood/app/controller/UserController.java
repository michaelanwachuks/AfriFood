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

import com.afrifood.app.dto.LoginRequest;
import com.afrifood.app.dto.RegisterRequest;
import com.afrifood.app.entity.UserEntity;
import com.afrifood.app.repository.UserRepository;
import com.afrifood.app.service.UserService;
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
    
    @GetMapping("/orders")
public ResponseEntity<?> getUserOrders(Authentication authentication) {

    if (authentication == null || !authentication.isAuthenticated()) {
        return ResponseEntity.status(401).body("Not logged in");
    }

    String email = authentication.getName();

    UserEntity user = userRepository.findByEmail(email);
    if (user == null) {
        throw new RuntimeException("User not found");
    }

    return ResponseEntity.ok(userService.getUserOrders(user.getId()));
}



}

