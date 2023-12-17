package com.OneBpy.dtos;

import lombok.Data;

import java.sql.Time;
import java.time.LocalTime;

@Data
public class AddStopRequest {
    private LocalTime stopTime;
    private String stopAddress;
}
