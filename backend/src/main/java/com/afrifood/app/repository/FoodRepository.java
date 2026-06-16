package com.afrifood.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.afrifood.app.entity.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {

    List<Food> findByAvailableTrueOrderByNameAsc();
}
