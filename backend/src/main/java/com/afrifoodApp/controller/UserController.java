package com.afrifoodApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public UserEntity registerUser(@RequestBody UserEntity user)   {
       return userService.registerUser(user);
        
    }

}
