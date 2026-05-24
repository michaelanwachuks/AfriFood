package com.afrifood.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.afrifood.app.dto.OrderResponse;
import com.afrifood.app.dto.UserSummaryResponse;
import com.afrifood.app.entity.UserEntity;
import com.afrifood.app.repository.UserRepository;

@Service
@Transactional
public class AdminService {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    public OrderResponse updateOrderStatus(Long orderId, String status) {
        return orderService.updateOrderStatus(orderId, status);
    }

    public List<UserSummaryResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toUserSummary)
                .collect(Collectors.toList());
    }

    private UserSummaryResponse toUserSummary(UserEntity user) {
        return new UserSummaryResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole());
    }
}
