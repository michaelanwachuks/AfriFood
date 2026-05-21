package com.afrifood.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.afrifood.app.config.JwtUtil;
import com.afrifood.app.dto.LoginRequest;
import com.afrifood.app.dto.RegisterRequest;
import com.afrifood.app.entity.Cart;
import com.afrifood.app.entity.OrderEntity;
import com.afrifood.app.entity.UserEntity;
import com.afrifood.app.repository.OrderRepository;
import com.afrifood.app.repository.UserRepository;

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

    @Autowired
    private OrderRepository orderRepository;

    RegisterRequest registerRequest;

    public UserEntity registerUser(RegisterRequest request){
         
    registerRequest = request;
         
    if (!request.getPassword().equals(request.getConfirmPassword())) {
        throw new RuntimeException("Passwords do not match");
    }

    //check duplicate email
    if (userRepository.existsByEmail(request.getEmail())) {
        throw new RuntimeException("Email already exists");
    }

    //map DTO → Entity
    UserEntity user = new UserEntity();
    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPhone(request.getPhone());

    //hash password before saving to database
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    user.setPassword(encoder.encode(request.getPassword()));

    return userRepository.save(user);
        
    }

    //define a method to login user
    public UserEntity loginUser(String email, String password, LoginRequest request, HttpServletResponse response    ) {

        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }
          
        if (user != null &&
            passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            String token = JwtUtil.generateToken(user.getEmail());

            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false); // I will set to true in production
            cookie.setPath("/");
            cookie.setMaxAge(86400);

            response.addCookie(cookie);

        }
        return user;
    }


    public List<OrderEntity> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
                
    }

    public List<Cart> getUserCartItems(Long userId) {
        // Implement logic to retrieve cart items for the user
        return null; // Placeholder return statement
    }
         
}
