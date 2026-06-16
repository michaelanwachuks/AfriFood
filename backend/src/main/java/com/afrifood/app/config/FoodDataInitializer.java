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

        seed("jollof.jpg", "Jollof Rice", "Nigeria", "Rice Dishes",
                "Smoky tomato rice cooked with peppers, spices, and tender chicken.", 1299.0);
        seed("poundo.jpg", "Pounded Yam", "Nigeria", "Traditional Meals",
                "Smooth pounded yam served with rich egusi or vegetable soup.", 1499.0);
        seed("amala.jpg", "Amala", "Nigeria", "Traditional Meals",
                "Soft yam flour swallow paired with classic Nigerian soup.", 1099.0);
        seed("suya.jpg", "Suya", "Nigeria", "Grills & BBQ",
                "Spicy grilled beef skewers with peanut spice rub and onions.", 1599.0);
        seed("suya_sallat.jpg", "Suya Special", "Nigeria", "Grills & BBQ",
                "Premium suya platter with salad, pepper sauce, and extra spice.", 2099.0);
        seed("amala-and-ewedu-2.jpg", "Amala and Ewedu", "Nigeria", "Traditional Meals",
                "Amala with ewedu and stew — a beloved Yoruba classic.", 1299.0);
        seed("jollof.jpg", "Waakye", "Ghana", "Rice Dishes",
                "Rice and beans cooked with millet leaves, served with shito and gari.", 1199.0);
        seed("suya.jpg", "Banku with Tilapia", "Ghana", "Traditional Meals",
                "Fermented corn and cassava dough with grilled tilapia and pepper sauce.", 1899.0);
        seed("jollof.jpg", "Thieboudienne", "Senegal", "Rice Dishes",
                "Senegal's national dish — fish, rice, and vegetables in flavorful tomato broth.", 1699.0);
        seed("amala-and-ewedu-2.jpg", "Doro Wat with Injera", "Ethiopia", "Traditional Meals",
                "Spicy chicken stew slow-cooked with berbere, served on spongy injera.", 1799.0);
        seed("suya.jpg", "Nyama Choma", "Kenya", "Grills & BBQ",
                "Charcoal-grilled goat or beef — Kenya's favourite barbecue feast.", 1999.0);
        seed("poundo.jpg", "Ugali with Sukuma Wiki", "Kenya", "Traditional Meals",
                "Maize meal staple with sautéed collard greens and optional stew.", 999.0);
        seed("amala.jpg", "Bobotie", "South Africa", "Traditional Meals",
                "Baked curried mince topped with egg custard — Cape Malay heritage dish.", 1549.0);
        seed("jollof.jpg", "Bunny Chow", "South Africa", "Rice Dishes",
                "Hollow bread loaf filled with hearty Durban-style curry.", 1399.0);
        seed("amala-and-ewedu-2.jpg", "Chicken Tagine", "Morocco", "Stews",
                "Slow-braised chicken with olives, lemon, and warm North African spices.", 1749.0);
        seed("jollof.jpg", "Koshari", "Egypt", "Rice Dishes",
                "Comfort bowl of rice, lentils, pasta, chickpeas, and tangy tomato sauce.", 1149.0);
        seed("amala.jpg", "Ndolé", "Cameroon", "Stews",
                "Bitterleaf stew with groundnuts, crayfish, and fish or beef.", 1649.0);
        seed("jollof.jpg", "Pilau", "Tanzania", "Rice Dishes",
                "Fragrant spiced rice with cardamom, cinnamon, and tender meat.", 1349.0);
        seed("suya_sallat.jpg", "Attiéké with Grilled Fish", "Côte d'Ivoire", "Grills & BBQ",
                "Fermented cassava couscous with grilled fish and fresh chilli sauce.", 1849.0);
        seed("poundo.jpg", "Couscous Royale", "Tunisia", "Traditional Meals",
                "Steamed semolina with lamb, chicken, vegetables, and harissa broth.", 1899.0);

        System.out.println("Menu foods seeded into database (" + foodRepository.count() + " items).");
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
