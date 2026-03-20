package com.afrifoodApp.model;
import org.springframework.data.jpa.repository.JpaRepository;

import com.afrifoodApp.entity.UserEntity;

 

public interface UserRepository  extends JpaRepository<UserEntity, Long>    {

    
}