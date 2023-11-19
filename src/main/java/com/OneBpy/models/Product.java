package com.OneBpy.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;


import java.sql.Time;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "product_tb")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productID;
    private String productName;
    private String productImage;
    private int remainSeat;
    private int Rate;
    private boolean display;
    private String bienSoXe;
    private String phoneNumber;
    private String description;
    private int price;
    private Time startTime;
    private Time endTime;
    private String startAddress;
    private String endAddress;
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "store_id")
    @JsonBackReference  // Đánh dấu mối quan hệ không quản lý
    private Store store;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    @JsonManagedReference  // Đánh dấu mối quan hệ quản lý
    private List<Stop> stopList;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    @JsonManagedReference  // Đánh dấu mối quan hệ quản lý
    @JsonIgnore
    private List<Notice> noticeList;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    @JsonManagedReference  // Đánh dấu mối quan hệ quản lý
    @JsonIgnore
    private List<Order> orderList;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
}
