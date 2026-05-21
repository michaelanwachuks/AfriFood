package com.afrifood.app.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
 

@Entity
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int orderNumber;
    
    private String shippingAddress;
    private String orderStatus;
    private double totalAmount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    public OrderEntity() {
    }

    public OrderEntity(Long id, int orderNumber, String shippingAddress, String orderStatus, double totalAmount, UserEntity user_id) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.shippingAddress = shippingAddress;
        this.orderStatus = orderStatus;
        this.totalAmount = totalAmount;
        this.user = user_id;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }   

    public void setId(Long id) {
        this.id = id;
    }

    public int getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(int orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    // toString method
    @Override
    public String toString() {
        return "OrderEntity{" +
                "id=" + id +
                ", orderNumber=" + orderNumber +
                ", shippingAddress='" + shippingAddress + '\'' +
                ", orderStatus='" + orderStatus + '\'' +
                ", totalAmount=" + totalAmount +
                ", user=" + user +
                '}';
    }


    
}
