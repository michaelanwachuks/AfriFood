package com.afrifood.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String productName;
    private int quantity;
    private double price;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    // Many CartItems belong to one Cart
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    // empty constructor
    public CartItem() {   }

    // constructor with parameters
    public CartItem(Long id, String productName, int quantity, double price, Cart cart) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.cart = cart;
    }

    // getters & setters
    public Long getId() {
        return id;
    }  

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

        @Override
    public String toString() {
        return "CartItem{" +
                "id=" + id +
                ", productName='" + productName + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';    

}
}


