package com.afrifood.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.afrifood.app.service.FoodService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping("/foods")
    public Object getAvailableFoods() {
        return foodService.getAvailableFoods();
    }
}
