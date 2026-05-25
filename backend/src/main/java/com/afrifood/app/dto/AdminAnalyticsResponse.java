package com.afrifood.app.dto;

import java.util.List;

public class AdminAnalyticsResponse {
    private long totalOrders;
    private long totalUsers;
    private long totalAdmins;
    private long totalFoods;
    private double totalRevenue;
    private double averageOrderValue;
    private long pendingOrders;
    private long activeOrders;
    private long deliveredOrders;
    private long cancelledOrders;
    private List<StatusCountDto> ordersByStatus;
    private List<DailyMetricDto> last7Days;
    private List<TopProductDto> topProducts;
    private List<OrderResponse> recentOrders;

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalAdmins() {
        return totalAdmins;
    }

    public void setTotalAdmins(long totalAdmins) {
        this.totalAdmins = totalAdmins;
    }

    public long getTotalFoods() {
        return totalFoods;
    }

    public void setTotalFoods(long totalFoods) {
        this.totalFoods = totalFoods;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getAverageOrderValue() {
        return averageOrderValue;
    }

    public void setAverageOrderValue(double averageOrderValue) {
        this.averageOrderValue = averageOrderValue;
    }

    public long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public long getActiveOrders() {
        return activeOrders;
    }

    public void setActiveOrders(long activeOrders) {
        this.activeOrders = activeOrders;
    }

    public long getDeliveredOrders() {
        return deliveredOrders;
    }

    public void setDeliveredOrders(long deliveredOrders) {
        this.deliveredOrders = deliveredOrders;
    }

    public long getCancelledOrders() {
        return cancelledOrders;
    }

    public void setCancelledOrders(long cancelledOrders) {
        this.cancelledOrders = cancelledOrders;
    }

    public List<StatusCountDto> getOrdersByStatus() {
        return ordersByStatus;
    }

    public void setOrdersByStatus(List<StatusCountDto> ordersByStatus) {
        this.ordersByStatus = ordersByStatus;
    }

    public List<DailyMetricDto> getLast7Days() {
        return last7Days;
    }

    public void setLast7Days(List<DailyMetricDto> last7Days) {
        this.last7Days = last7Days;
    }

    public List<TopProductDto> getTopProducts() {
        return topProducts;
    }

    public void setTopProducts(List<TopProductDto> topProducts) {
        this.topProducts = topProducts;
    }

    public List<OrderResponse> getRecentOrders() {
        return recentOrders;
    }

    public void setRecentOrders(List<OrderResponse> recentOrders) {
        this.recentOrders = recentOrders;
    }
}
