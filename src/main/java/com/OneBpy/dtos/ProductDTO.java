package com.OneBpy.dtos;

import com.OneBpy.models.Notice;
import com.OneBpy.models.Stop;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
public class ProductDTO {
    private Long productID;
    private String productName;
    private String productImage;
    private int remainSeat;
    private String bienSoXe;
    private String phoneNumber;
    private String phoneNumber2;
    private String type;
    private String description;
    private String policy;
    private String tienIch;
    private int price;
    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;
    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime endTime;
    private String startAddress;
    private String endAddress;
    private boolean deleted;
    private List<StopDTO> stopList;
    private List<Notice> noticeList;
    private String storeName;
}
