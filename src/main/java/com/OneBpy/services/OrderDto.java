package com.OneBpy.services;
import java.time.LocalDateTime;
public interface OrderDto {
    Long getOrderId();
    String getPickUpAddress();
    String getDestinationAddress();
    LocalDateTime getPickTime();
    String getMessage();
    Integer getQuantity();
    String getPhoneNumber();
    Integer getTotalPrice();
    String getOrderStatus();
    LocalDateTime getCreatedAt();
    String getProductName();
    Long getUserId();

    Integer getPrice();
}
