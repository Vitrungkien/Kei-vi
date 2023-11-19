package com.OneBpy.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "store_tb")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long storeID;
    private String storeName;
    @Column(nullable = false)
    private String phoneNumber;
    private String introduce;
    private Date createdAt;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    @JsonBackReference  // Đánh dấu mối quan hệ không quản lý
    private User user;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    private List<Product> productList;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

}
