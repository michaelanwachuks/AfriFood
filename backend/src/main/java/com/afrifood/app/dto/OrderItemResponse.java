package com.afrifood.app.dto;

public class OrderItemResponse {
    private Long id;
    private String productName;
    private Integer quantity;
    private Double price;
    private Double lineTotal;

    public OrderItemResponse() {
    }

    public OrderItemResponse(Long id, String productName, Integer quantity, Double price, Double lineTotal) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.lineTotal = lineTotal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getLineTotal() {
        return lineTotal;
    }

    public void setLineTotal(Double lineTotal) {
        this.lineTotal = lineTotal;
    }
}
