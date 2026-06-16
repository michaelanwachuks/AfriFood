package com.afrifood.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.afrifood.app.dto.FoodResponse;
import com.afrifood.app.entity.Food;
import com.afrifood.app.repository.FoodRepository;

@Service
@Transactional(readOnly = true)
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public List<FoodResponse> getAvailableFoods() {
        return foodRepository.findByAvailableTrueOrderByNameAsc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public FoodResponse toResponse(Food food) {
        return new FoodResponse(
                food.getId(),
                food.getName(),
                food.getDescription(),
                food.getPrice(),
                food.getImageUrl(),
                food.getCategory(),
                food.getCountryOfOrigin(),
                food.getAvailable());
    }
}
