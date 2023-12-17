package com.OneBpy.dtos;

import lombok.Data;

@Data
public class CreateNoticeDTO {
    private String title;
    private String content;
    private Long productID;
}
