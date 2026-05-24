package com.afrifood.app.dto;

import java.util.List;

public class CheckoutRequest {
    private String shippingAddress;
    private List<CheckoutItemDto> items;

    public CheckoutRequest() {
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public List<CheckoutItemDto> getItems() {
        return items;
    }

    public void setItems(List<CheckoutItemDto> items) {
        this.items = items;
    }
}
