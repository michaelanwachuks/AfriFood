package com.afrifoodApp.services;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties.Apiversion.Use;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.afrifoodApp.entity.UserEntity;
import com.afrifoodApp.model.UserRepository;

@Transactional
@Service
public class UserService {

    //inject the UserRepository 
    @Autowired
    UserRepository userRepository;

    public UserEntity registerUser(UserEntity user){
        return userRepository.save(user);
        
    }
}
