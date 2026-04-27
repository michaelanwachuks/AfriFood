package com.afrifoodApp.services;

import javax.swing.text.html.parser.Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties.Apiversion.Use;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.afrifoodApp.config.JwtUtil;
import com.afrifoodApp.dto.RegisterRequest;
import com.afrifoodApp.entity.UserEntity;
import com.afrifoodApp.model.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Transactional
@Service
public class UserService {

    //inject the UserRepository 
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

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
    public UserEntity loginUser(String email, String password, RegisterRequest request, HttpServletResponse response    ) {
        //find user by email
        UserEntity user = userRepository.findByEmailAndPassword(email, password).stream().findFirst().orElse(null);
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }
         //UserEntity user = userRepository.findByEmail(request.getEmail());

        if (user != null &&
            passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            String token = JwtUtil.generateToken(user.getEmail());

            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false); // true in production
            cookie.setPath("/");
            cookie.setMaxAge(86400);

            response.addCookie(cookie);

           // return ResponseEntity.ok(user);
        }
        return user;
    }


         
}
