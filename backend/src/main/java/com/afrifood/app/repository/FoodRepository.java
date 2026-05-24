package com.afrifood.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.afrifood.app.entity.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
