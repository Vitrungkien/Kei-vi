package com.OneBpy.dtos;

import lombok.Data;

import java.sql.Time;
@Data
public class AddStopRequest {
    private Time stopTime;
    private String stopAddress;
}
