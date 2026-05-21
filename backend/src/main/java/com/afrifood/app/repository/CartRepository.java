package com.afrifood.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.afrifood.app.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

 List<Cart> findByUserId(Long userId);
    
}
