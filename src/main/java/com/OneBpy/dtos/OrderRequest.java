package com.OneBpy.dtos;

import lombok.Data;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class OrderRequest {
    private String pickUpAddress;
    private String destinationAddress;
    private LocalDateTime pickTime;
    private String message;
    private int quantity;
    private String phoneNumber;
    private Integer totalPrice;
}
