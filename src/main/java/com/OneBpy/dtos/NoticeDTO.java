package com.OneBpy.dtos;

import java.time.LocalDateTime;
import java.time.LocalTime;

public interface NoticeDTO {
    Long getProductId();
    Long getNoticeId();
    String getProductName();
    LocalTime getStartTime();
    String getBienSoXe();
    String getTitle();
    String getContent();
    LocalDateTime getCreatedAt();
    boolean isExpired();
}
