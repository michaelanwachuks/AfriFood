package com.afrifoodApp.entity;

import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class AllAfiriFoods {
    
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY) 
private Long id;

private String name;
private String description;
private Double price;
private String imageUrl;
private String category;
private String countryOfOrigin;
private Boolean available;

@OneToMany(mappedBy = "food")
private List<CartItem> cartItem;

@OneToMany(mappedBy = "food")
private List<OrderItem> orderItems;

public AllAfiriFoods() {
}

public AllAfiriFoods(Long id, String name, String description, Double price, String imageUrl, String category, String countryOfOrigin, Boolean available) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.countryOfOrigin = countryOfOrigin;
    this.available = available;

}

// Getters and Setters
public Long getId() {
    return id; 
}

public void setId(Long id) {
    this.id = id;   

}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

public Double getPrice() {
    return price;
}

public void setPrice(Double price) {
    this.price = price;
}

public String getImageUrl() {
    return imageUrl;
}

public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
}

public String getCategory() {
    return category;
}

public void setCategory(String category) {
    this.category = category;
}

public Boolean getAvailable() {
    return available;
}

public void setAvailable(Boolean available) {
    this.available = available;
}

public String getCountryOfOrigin() {
    return countryOfOrigin;
}

public void setCountryOfOrigin(String countryOfOrigin) {
    this.countryOfOrigin = countryOfOrigin;
}

@Override
public String toString() {
    return "AfiriFoods{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", description='" + description + '\'' +
            ", price=" + price +
            ", imageUrl='" + imageUrl + '\'' +
            ", category='" + category + '\'' +
            ", countryOfOrigin='" + countryOfOrigin + '\'' +
            ", available=" + available +
            '}';
}
}
 

