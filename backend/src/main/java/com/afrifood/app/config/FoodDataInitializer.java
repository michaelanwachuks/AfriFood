package com.afrifood.app.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.afrifood.app.entity.Food;
import com.afrifood.app.repository.FoodRepository;

@Component
public class FoodDataInitializer implements CommandLineRunner {

    private final FoodRepository foodRepository;

    public FoodDataInitializer(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    public void run(String... args) {
        if (foodRepository.count() > 0) {
            return;
        }

        seed("/src/assets/jollof.jpg", "Jollof Rice", "Nigeria", "Rice Dishes",
                "Smoky tomato rice with peppers and spices.", 1299.0);
        seed("/src/assets/poundo.jpg", "Pounded Yam", "Nigeria", "Traditional Meals",
                "Smooth pounded yam with soup.", 1499.0);
        seed("/src/assets/amala.jpg", "Amala", "Nigeria", "Traditional Meals",
                "Yam flour swallow with Nigerian soup.", 1099.0);
        seed("/src/assets/suya.jpg", "Suya", "Nigeria", "Grills & BBQ",
                "Spicy grilled beef skewers.", 1599.0);
        seed("/src/assets/suya_sallat.jpg", "Suya Special", "Nigeria", "Grills & BBQ",
                "Premium suya platter with sides.", 2099.0);
        seed("/src/assets/amala-and-ewedu-2.jpg", "Amala and Ewedu", "Nigeria", "Traditional Meals",
                "Amala with ewedu and stew.", 1299.0);
        seed("/src/assets/jollof.jpg", "Waakye", "Ghana", "Rice Dishes",
                "Rice and beans with shito and gari.", 1199.0);
        seed("/src/assets/suya.jpg", "Nyama Choma", "Kenya", "Grills & BBQ",
                "Charcoal-grilled meat feast.", 1999.0);
        seed("/src/assets/jollof.jpg", "Thieboudienne", "Senegal", "Rice Dishes",
                "Fish and rice in tomato broth.", 1699.0);
        seed("/src/assets/amala-and-ewedu-2.jpg", "Chicken Tagine", "Morocco", "Stews",
                "Slow-braised chicken with olives and spices.", 1749.0);

        System.out.println("Sample menu foods seeded into database.");
    }

    private void seed(String imageUrl, String name, String country, String category,
            String description, double price) {
        Food food = new Food();
        food.setName(name);
        food.setCountryOfOrigin(country);
        food.setCategory(category);
        food.setDescription(description);
        food.setPrice(price);
        food.setImageUrl(imageUrl);
        food.setAvailable(true);
        foodRepository.save(food);
    }
}
