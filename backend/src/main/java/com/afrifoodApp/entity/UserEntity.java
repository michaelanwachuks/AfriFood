package com.afrifoodApp.entity;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String password;
    private String confirmPassword;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    //create emply constructor
    public UserEntity() {
    }

    //create constructor with parameters
    public UserEntity(Long id, String thename, String confirmPass, String email, String phone, String password, Date createdAt, Date updatedAt) {
        this.id = id;
        this.name = thename;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.confirmPassword = confirmPass;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt; 
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

    public void setName(String thename) {
        this.name = thename;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getConfirmPassword() {
        return confirmPassword;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }   
    
    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    
    public Date getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }   

    // Override toString() method
    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", thename='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' + 
                ", password='" + password + '\'' +
                ", confirmPassword='" + confirmPassword + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }

}
