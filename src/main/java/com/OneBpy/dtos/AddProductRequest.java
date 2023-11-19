package com.OneBpy.dtos;

import lombok.Data;

import java.sql.Time;
@Data
public class AddProductRequest {
    private String productName;
    private String productImage;
    private int remainSeat;
    private String bienSoXe;
    private String phoneNumber;
    private String description;
    private int price;
    private Time startTime;
    private Time endTime;
    private String startAddress;
    private String endAddress;
}
