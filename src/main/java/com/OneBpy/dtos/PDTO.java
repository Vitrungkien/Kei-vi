package com.OneBpy.dtos;

import com.OneBpy.models.Notice;
import com.OneBpy.models.Order;
import com.OneBpy.models.Stop;
import lombok.Data;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
public class PDTO {
    private Long productID;
    private String productName;
    private String productImage;
    private int remainSeat;
    private boolean display;
    private String bienSoXe;
    private String phoneNumber;
    private String phoneNumber2;
    private String description;
    private String policy;
    private String tienIch;
    private String type;
    private int price;
    private LocalTime startTime;
    private LocalTime endTime;
    private String startAddress;
    private String endAddress;
    private boolean deleted;
    private Date lastUpdate;
    private Date createdAt;
    private List<Stop> stopList;
    private List<Notice> noticeList;
    private List<Order> orderList;
    private String storeName;

    public PDTO(Long productID, String productName, String productImage, int remainSeat, boolean display, String bienSoXe, String phoneNumber, String phoneNumber2, String description, String policy, String tienIch, String type, int price, LocalTime startTime, LocalTime endTime, String startAddress, String endAddress, boolean deleted, Date lastUpdate, Date createdAt, List<Stop> stopList, List<Notice> noticeList, List<Order> orderList, String storeName) {
        this.productID = productID;
        this.productName = productName;
        this.productImage = productImage;
        this.remainSeat = remainSeat;
        this.display = display;
        this.bienSoXe = bienSoXe;
        this.phoneNumber = phoneNumber;
        this.phoneNumber2 = phoneNumber2;
        this.description = description;
        this.policy = policy;
        this.tienIch = tienIch;
        this.type = type;
        this.price = price;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startAddress = startAddress;
        this.endAddress = endAddress;
        this.deleted = deleted;
        this.lastUpdate = lastUpdate;
        this.createdAt = createdAt;
        this.stopList = stopList;
        this.noticeList = noticeList;
        this.orderList = orderList;
        this.storeName = storeName;
    }
}
