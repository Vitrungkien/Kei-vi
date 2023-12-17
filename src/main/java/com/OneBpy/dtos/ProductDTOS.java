package com.OneBpy.dtos;

import com.OneBpy.models.Notice;
import com.OneBpy.models.Order;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

public interface ProductDTOS {
     Long getProductID();
     String getProductName();
     String getProductImage();
     Integer getRemainSeat();
     boolean isDisplay();
     String getBienSoXe();
     String getPhoneNumber();
     String getPhoneNumber2();
     String getDescription();
     String getPolicy();
     String getTienIch();
     String getType();
     Integer getPrice();
     LocalTime getStartTime();
     LocalTime getEndTime();
     String getStartAddress();
     String getEndAddress();
     boolean isDeleted();
     Date getLastUpdate();
     Date getCreatedAt();
     List<StopDTO> getStopList();
     List<Notice> getNoticeList();
     List<Order> getOrderList();
     String getStoreName();
}
