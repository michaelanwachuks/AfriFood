package com.afrifoodApp.model;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.afrifoodApp.entity.UserEntity;

 

public interface UserRepository  extends JpaRepository<UserEntity, Long>    {

    boolean existsByEmail(String email);

    List<UserEntity> findByEmailandPassword(String email, String password);
}