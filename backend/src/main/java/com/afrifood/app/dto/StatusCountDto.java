package com.afrifood.app.dto;

public class StatusCountDto {
    private String status;
    private long count;

    public StatusCountDto() {
    }

    public StatusCountDto(String status, long count) {
        this.status = status;
        this.count = count;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
