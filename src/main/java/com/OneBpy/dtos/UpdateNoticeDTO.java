package com.OneBpy.dtos;

import lombok.Data;

@Data
public class UpdateNoticeDTO {
    private Long noticeID;
    private String title;
    private String content;
    private boolean expired;
}
