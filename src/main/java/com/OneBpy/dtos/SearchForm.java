package com.OneBpy.dtos;

import lombok.Data;

import java.time.LocalTime;

@Data
public class SearchForm {
    private LocalTime startTime1;
    private String endAddress;
    private String startAddress;

}
