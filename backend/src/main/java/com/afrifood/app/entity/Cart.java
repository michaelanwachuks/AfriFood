package com.afrifood.app.entity;

import java.util.List;

 import jakarta.persistence.Id;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

     @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    //Cart contains multiple items
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<CartItem> cartItems;

    //  empty constructor
    public Cart() {  }

    // constructor with parameters
    public Cart(Long id, UserEntity user, List<CartItem> cartItems) {
        this.id = id;
        this.user = user;
        this.cartItems = cartItems;
    }

    // getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

        @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", user=" + user +
                ", cartItems=" + cartItems +
                '}';
    }
}
