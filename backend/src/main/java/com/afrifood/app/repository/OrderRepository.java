package com.afrifood.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.afrifood.app.entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findByUser_Id(Long userId);
    
}
