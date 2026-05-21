package com.afrifood.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.afrifood.app.entity.UserEntity;

 

public interface UserRepository  extends JpaRepository<UserEntity, Long>    {

    boolean existsByEmail(String email);

   // List<UserEntity> findByEmailAndPassword(String email, String password);
    
    UserEntity findByEmail(String email);


}