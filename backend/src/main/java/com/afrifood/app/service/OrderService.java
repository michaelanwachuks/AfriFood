package com.afrifood.app.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.afrifood.app.dto.CheckoutItemDto;
import com.afrifood.app.dto.CheckoutRequest;
import com.afrifood.app.dto.OrderItemResponse;
import com.afrifood.app.dto.OrderResponse;
import com.afrifood.app.entity.Food;
import com.afrifood.app.entity.OrderEntity;
import com.afrifood.app.entity.OrderItem;
import com.afrifood.app.entity.UserEntity;
import com.afrifood.app.repository.FoodRepository;
import com.afrifood.app.repository.OrderRepository;
import com.afrifood.app.repository.UserRepository;

@Service
@Transactional
public class OrderService {

    public static final double DELIVERY_FEE = 3000.0;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    public OrderResponse checkout(String email, CheckoutRequest request) {
        if (request.getShippingAddress() == null || request.getShippingAddress().isBlank()) {
            throw new IllegalArgumentException("Shipping address is required");
        }
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("Cart is empty");
        }

        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        double subtotal = 0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (CheckoutItemDto itemDto : request.getItems()) {
            if (itemDto.getQuantity() == null || itemDto.getQuantity() < 1) {
                throw new IllegalArgumentException("Invalid quantity for item: " + itemDto.getProductName());
            }
            if (itemDto.getPrice() == null || itemDto.getPrice() < 0) {
                throw new IllegalArgumentException("Invalid price for item: " + itemDto.getProductName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(itemDto.getPrice());
            orderItem.setProductName(itemDto.getProductName());

            if (itemDto.getFoodId() != null) {
                Food food = foodRepository.findById(itemDto.getFoodId()).orElse(null);
                orderItem.setFood(food);
            }

            subtotal += itemDto.getPrice() * itemDto.getQuantity();
            orderItems.add(orderItem);
        }

        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setShippingAddress(request.getShippingAddress().trim());
        order.setOrderStatus("PENDING");
        order.setOrderNumber((int) (System.currentTimeMillis() % 1_000_000_000));
        order.setTotalAmount(subtotal + DELIVERY_FEE);

        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(order);
        }
        order.setOrderItems(orderItems);

        OrderEntity saved = orderRepository.save(order);
        return toOrderResponse(saved, subtotal);
    }

    public List<OrderResponse> getOrdersForUser(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(order -> toOrderResponse(order, calculateSubtotal(order)))
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderForUser(Long userId, Long orderId) {
        OrderEntity order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        return toOrderResponse(order, calculateSubtotal(order));
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllWithDetails().stream()
                .map(order -> toOrderResponse(order, calculateSubtotal(order)))
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderById(Long orderId) {
        OrderEntity order = orderRepository.findByIdWithDetails(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        return toOrderResponse(order, calculateSubtotal(order));
    }

    public OrderResponse updateOrderStatus(Long orderId, String status) {
        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Status is required");
        }

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        order.setOrderStatus(status.trim().toUpperCase());
        OrderEntity saved = orderRepository.save(order);
        return toOrderResponse(saved, calculateSubtotal(saved));
    }

    private double calculateSubtotal(OrderEntity order) {
        if (order.getOrderItems() == null) {
            return order.getTotalAmount() - DELIVERY_FEE;
        }
        return order.getOrderItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    private OrderResponse toOrderResponse(OrderEntity order, double subtotal) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setOrderNumber(order.getOrderNumber());
        response.setOrderStatus(order.getOrderStatus());
        response.setShippingAddress(order.getShippingAddress());
        response.setSubtotal(subtotal);
        response.setDeliveryFee(DELIVERY_FEE);
        response.setTotalAmount(order.getTotalAmount());

        if (order.getUser() != null) {
            response.setCustomerName(order.getUser().getName());
            response.setCustomerEmail(order.getUser().getEmail());
        }

        if (order.getCreatedAt() != null) {
            response.setCreatedAt(order.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }

        if (order.getOrderItems() != null) {
            response.setItems(order.getOrderItems().stream()
                    .map(item -> new OrderItemResponse(
                            item.getId(),
                            resolveProductName(item),
                            item.getQuantity(),
                            item.getPrice(),
                            item.getPrice() * item.getQuantity()))
                    .collect(Collectors.toList()));
        }

        return response;
    }

    private String resolveProductName(OrderItem item) {
        if (item.getProductName() != null && !item.getProductName().isBlank()) {
            return item.getProductName();
        }
        if (item.getFood() != null) {
            return item.getFood().getName();
        }
        return "Item";
    }
}
