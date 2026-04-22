package com.afrifoodApp.services;

import javax.swing.text.html.parser.Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties.Apiversion.Use;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.afrifoodApp.dto.RegisterRequest;
import com.afrifoodApp.entity.UserEntity;
import com.afrifoodApp.model.UserRepository;

@Transactional
@Service
public class UserService {

    //inject the UserRepository 
    @Autowired
    UserRepository userRepository;
    
    RegisterRequest registerRequest;

    public UserEntity registerUser(RegisterRequest request){
        //return userRepository.save(user);
registerRequest = request;
         // ✅ validate passwords
    if (!request.getPassword().equals(request.getConfirmPassword())) {
        throw new RuntimeException("Passwords do not match");
    }

    // ✅ check duplicate email
    if (userRepository.existsByEmail(request.getEmail())) {
        throw new RuntimeException("Email already exists");
    }

    // ✅ map DTO → Entity
    UserEntity user = new UserEntity();
    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPhone(request.getPhone());

    // 🔐 hash password (IMPORTANT)
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    user.setPassword(encoder.encode(request.getPassword()));

    return userRepository.save(user);
        
    }

    //define a method to login user
    public UserEntity loginUser(String email, String password) {
        //find user by email
        UserEntity user = userRepository.findByEmailandPassword(email, password).stream().findFirst().orElse(null);
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }

    
         
}
