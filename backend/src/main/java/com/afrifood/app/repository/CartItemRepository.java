package com.afrifood.app.repository;

import java.util.List;

import com.afrifood.app.entity.CartItem;

public interface CartItemRepository {
    
    List<CartItem> findByCartId(Long cartId);

    List<CartItem> findByCartIdAndProductId(Long cartId, Long productId);
}
