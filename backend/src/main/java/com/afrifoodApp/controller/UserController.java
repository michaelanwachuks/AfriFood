package com.afrifoodApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.afrifoodApp.dto.RegisterRequest;
import com.afrifoodApp.entity.UserEntity;
import com.afrifoodApp.services.UserService;

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
    public ResponseEntity<?> loginUser(@RequestBody RegisterRequest request) {
        UserEntity user = userService.loginUser(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(user);
    }
    



}
