package com.OneBpy.dtos;

import lombok.Data;

import java.sql.Time;
@Data
public class OrderRequest {
    private String pickUpAddress;
    private String detinationAddress;
    private Time pickTime;
    private String message;
    private int quantity;
    private String phoneNumber;
}
