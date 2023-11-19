package com.OneBpy.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "notice_tb")
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long noticeID;
    private String title;
    private String content;
    private Date createdAt;
    @Column(name = "is_active")
    private boolean isActive;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference  // Đánh dấu mối quan hệ không quản lý
    private Product product;

    @PrePersist
    protected void onCreate() {
        createdAt = new java.util.Date();
    }
}
