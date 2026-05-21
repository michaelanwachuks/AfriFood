package com.afrifood.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItem {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private Integer quantity;
private Double price;

@ManyToOne 
@JoinColumn(name = "order_id")  
private OrderEntity order;

@ManyToOne 
@JoinColumn(name = "food_id")  
private Food food;

public OrderItem() {
}

public OrderItem(Long id, Integer quantity, Double price, OrderEntity order, Food food) {
    this.id = id;
    this.quantity = quantity;
    this.price = price;
    this.order = order;
    this.food = food;
}

// Getters and Setters
public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public Integer getQuantity() {
    return quantity;
}

public void setQuantity(Integer quantity) {
    this.quantity = quantity;
}

public Double getPrice() {
    return price;
}

public void setPrice(Double price) {
    this.price = price;
}

public OrderEntity getOrder() {
    return order;
}

public void setOrder(OrderEntity order) {
    this.order = order;
}

public Food getFood() {
    return food;
}

public void setFood(Food food) {
    this.food = food;
}

@Override
public String toString() {
    return "OrderItems{" +
            "id=" + id +
            ", quantity=" + quantity +
            ", price=" + price +
            ", order=" + order +
            ", food=" + food +
            '}';
}

}