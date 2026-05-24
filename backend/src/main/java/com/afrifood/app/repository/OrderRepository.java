package com.afrifood.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.afrifood.app.entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    @Query("SELECT DISTINCT o FROM OrderEntity o LEFT JOIN FETCH o.orderItems WHERE o.user.id = :userId ORDER BY o.id DESC")
    List<OrderEntity> findByUserId(@Param("userId") Long userId);

    @Query("SELECT o FROM OrderEntity o LEFT JOIN FETCH o.orderItems WHERE o.id = :orderId AND o.user.id = :userId")
    Optional<OrderEntity> findByIdAndUserId(@Param("orderId") Long orderId, @Param("userId") Long userId);

}
