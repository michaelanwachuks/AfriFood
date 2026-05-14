package com.afrifoodApp.entity;

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
   // @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
   // private List<Cart> cart;

    // getters & setters
}
