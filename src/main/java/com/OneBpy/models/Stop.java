package com.OneBpy.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.sql.Time;

@Data
@Entity
@Table(name = "stop_tb")
public class Stop {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stop_id")
    private Long stopID;
    private Time stopTime;
    private String stopAddress;
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference  // Đánh dấu mối quan hệ không quản lý
    private Product product;

    @PrePersist
    protected void onCreate() {
        createdAt = new java.util.Date();
    }
}
