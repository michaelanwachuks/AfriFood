package com.afrifood.app.dto;

public class DailyMetricDto {
    private String date;
    private long count;
    private double revenue;

    public DailyMetricDto() {
    }

    public DailyMetricDto(String date, long count, double revenue) {
        this.date = date;
        this.count = count;
        this.revenue = revenue;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }
}
