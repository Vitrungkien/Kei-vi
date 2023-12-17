package com.OneBpy.dtos;

import lombok.Data;

import java.time.LocalTime;

@Data
public class StopDTO {
    private Long stopID;
    private String stopAddress;
    private LocalTime stopTime;
    private boolean rightNow;
    private boolean deleted;
}
