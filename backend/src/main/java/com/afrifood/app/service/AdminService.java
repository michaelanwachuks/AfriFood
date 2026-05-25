package com.afrifood.app.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.afrifood.app.dto.AdminAnalyticsResponse;
import com.afrifood.app.dto.DailyMetricDto;
import com.afrifood.app.dto.FoodRequest;
import com.afrifood.app.dto.FoodResponse;
import com.afrifood.app.dto.OrderResponse;
import com.afrifood.app.dto.StatusCountDto;
import com.afrifood.app.dto.TopProductDto;
import com.afrifood.app.dto.UpdateUserRoleRequest;
import com.afrifood.app.dto.UserSummaryResponse;
import com.afrifood.app.entity.Food;
import com.afrifood.app.entity.OrderEntity;
import com.afrifood.app.entity.OrderItem;
import com.afrifood.app.entity.Role;
import com.afrifood.app.entity.UserEntity;
import com.afrifood.app.repository.FoodRepository;
import com.afrifood.app.repository.OrderRepository;
import com.afrifood.app.repository.UserRepository;

@Service
@Transactional
public class AdminService {

    private static final List<String> ACTIVE_STATUSES = List.of(
            "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY");

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    public AdminAnalyticsResponse getAnalytics() {
        List<OrderEntity> orders = orderRepository.findAllWithDetails();
        List<UserEntity> users = userRepository.findAll();

        AdminAnalyticsResponse analytics = new AdminAnalyticsResponse();
        analytics.setTotalOrders(orders.size());
        analytics.setTotalUsers(users.size());
        analytics.setTotalAdmins(users.stream().filter(u -> u.getRole() == Role.ADMIN).count());
        analytics.setTotalFoods(foodRepository.count());

        List<OrderEntity> nonCancelled = orders.stream()
                .filter(o -> !"CANCELLED".equalsIgnoreCase(o.getOrderStatus()))
                .collect(Collectors.toList());

        double revenue = nonCancelled.stream().mapToDouble(OrderEntity::getTotalAmount).sum();
        analytics.setTotalRevenue(revenue);
        analytics.setAverageOrderValue(nonCancelled.isEmpty() ? 0 : revenue / nonCancelled.size());

        analytics.setPendingOrders(countByStatus(orders, "PENDING"));
        analytics.setActiveOrders(orders.stream()
                .filter(o -> ACTIVE_STATUSES.contains(o.getOrderStatus()))
                .count());
        analytics.setDeliveredOrders(countByStatus(orders, "DELIVERED"));
        analytics.setCancelledOrders(countByStatus(orders, "CANCELLED"));

        analytics.setOrdersByStatus(buildStatusBreakdown(orders));
        analytics.setLast7Days(buildLast7Days(orders));
        analytics.setTopProducts(buildTopProducts(orders));
        List<OrderResponse> allOrderResponses = orderService.getAllOrders();
        analytics.setRecentOrders(allOrderResponses.stream().limit(5).collect(Collectors.toList()));

        return analytics;
    }

    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    public OrderResponse getOrder(Long id) {
        return orderService.getOrderById(id);
    }

    public OrderResponse updateOrderStatus(Long orderId, String status) {
        return orderService.updateOrderStatus(orderId, status);
    }

    public List<UserSummaryResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toUserSummary)
                .collect(Collectors.toList());
    }

    public UserSummaryResponse updateUserRole(Long userId, UpdateUserRoleRequest request, String currentAdminEmail) {
        if (request.getRole() == null) {
            throw new IllegalArgumentException("Role is required");
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (user.getEmail().equals(currentAdminEmail) && request.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("You cannot remove your own admin role");
        }

        if (user.getRole() == Role.ADMIN && request.getRole() == Role.USER) {
            long adminCount = userRepository.findAll().stream()
                    .filter(u -> u.getRole() == Role.ADMIN)
                    .count();
            if (adminCount <= 1) {
                throw new IllegalArgumentException("Cannot demote the last admin");
            }
        }

        user.setRole(request.getRole());
        return toUserSummary(userRepository.save(user));
    }

    public List<FoodResponse> getAllFoods() {
        return foodRepository.findAll().stream()
                .map(this::toFoodResponse)
                .collect(Collectors.toList());
    }

    public FoodResponse createFood(FoodRequest request) {
        validateFoodRequest(request);
        Food food = mapToFood(new Food(), request);
        if (food.getAvailable() == null) {
            food.setAvailable(true);
        }
        return toFoodResponse(foodRepository.save(food));
    }

    public FoodResponse updateFood(Long id, FoodRequest request) {
        validateFoodRequest(request);
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Food not found"));
        return toFoodResponse(foodRepository.save(mapToFood(food, request)));
    }

    public void deleteFood(Long id) {
        if (!foodRepository.existsById(id)) {
            throw new IllegalArgumentException("Food not found");
        }
        foodRepository.deleteById(id);
    }

    public FoodResponse toggleFoodAvailability(Long id, boolean available) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Food not found"));
        food.setAvailable(available);
        return toFoodResponse(foodRepository.save(food));
    }

    private long countByStatus(List<OrderEntity> orders, String status) {
        return orders.stream()
                .filter(o -> status.equalsIgnoreCase(o.getOrderStatus()))
                .count();
    }

    private List<StatusCountDto> buildStatusBreakdown(List<OrderEntity> orders) {
        Map<String, Long> counts = orders.stream()
                .collect(Collectors.groupingBy(
                        o -> o.getOrderStatus() != null ? o.getOrderStatus().toUpperCase() : "UNKNOWN",
                        Collectors.counting()));

        return counts.entrySet().stream()
                .map(e -> new StatusCountDto(e.getKey(), e.getValue()))
                .sorted(Comparator.comparing(StatusCountDto::getStatus))
                .collect(Collectors.toList());
    }

    private List<DailyMetricDto> buildLast7Days(List<OrderEntity> orders) {
        List<DailyMetricDto> metrics = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 6; i >= 0; i--) {
            LocalDate day = today.minusDays(i);
            String label = day.toString();

            long count = 0;
            double dayRevenue = 0;

            for (OrderEntity order : orders) {
                if (order.getCreatedAt() == null) {
                    continue;
                }
                LocalDate orderDay = order.getCreatedAt().toLocalDate();
                if (orderDay.equals(day) && !"CANCELLED".equalsIgnoreCase(order.getOrderStatus())) {
                    count++;
                    dayRevenue += order.getTotalAmount();
                }
            }

            metrics.add(new DailyMetricDto(label, count, dayRevenue));
        }

        return metrics;
    }

    private List<TopProductDto> buildTopProducts(List<OrderEntity> orders) {
        Map<String, double[]> productStats = new HashMap<>();

        for (OrderEntity order : orders) {
            if ("CANCELLED".equalsIgnoreCase(order.getOrderStatus()) || order.getOrderItems() == null) {
                continue;
            }
            for (OrderItem item : order.getOrderItems()) {
                String name = item.getProductName();
                if (name == null || name.isBlank()) {
                    name = item.getFood() != null ? item.getFood().getName() : "Unknown";
                }
                long qty = item.getQuantity() != null ? item.getQuantity() : 0;
                double lineTotal = item.getPrice() * qty;
                productStats.computeIfAbsent(name, k -> new double[2]);
                productStats.get(name)[0] += qty;
                productStats.get(name)[1] += lineTotal;
            }
        }

        return productStats.entrySet().stream()
                .map(e -> new TopProductDto(e.getKey(), (long) e.getValue()[0], e.getValue()[1]))
                .sorted(Comparator.comparingLong(TopProductDto::getQuantitySold).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

    private void validateFoodRequest(FoodRequest request) {
        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("Food name is required");
        }
        if (request.getPrice() == null || request.getPrice() < 0) {
            throw new IllegalArgumentException("Valid price is required");
        }
    }

    private Food mapToFood(Food food, FoodRequest request) {
        food.setName(request.getName().trim());
        food.setDescription(request.getDescription());
        food.setPrice(request.getPrice());
        food.setImageUrl(request.getImageUrl());
        food.setCategory(request.getCategory());
        food.setCountryOfOrigin(request.getCountryOfOrigin());
        if (request.getAvailable() != null) {
            food.setAvailable(request.getAvailable());
        }
        return food;
    }

    private FoodResponse toFoodResponse(Food food) {
        return new FoodResponse(
                food.getId(),
                food.getName(),
                food.getDescription(),
                food.getPrice(),
                food.getImageUrl(),
                food.getCategory(),
                food.getCountryOfOrigin(),
                food.getAvailable());
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
