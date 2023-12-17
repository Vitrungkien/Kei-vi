package com.OneBpy.dtos;

import jakarta.persistence.Column;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class OrderDtos {
    @Column(name = "order_id")
    private Long order_id;
    @Column(name = "created_at")
    private Date created_at;
    @Column(name = "message")
    private String message;
    @Column(name = "order_status")
    private String order_status;
    @Column(name = "phone_number")
    private String phone_number;
    @Column(name = "pick_time")
    private LocalDateTime pick_time;
    @Column(name = "pick_up_address")
    private String pick_up_address;
    @Column(name = "product_id")
    private Long product_id;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "total_price")
    private int total_price;
    @Column(name = "user_id")
    private Long user_id;
    @Column(name = "destination_address")
    private String destination_address;
    @Column(name = "product_name")
    private String product_name;

    public OrderDtos(Long order_id, Date created_at, String message, String order_status, String phone_number, LocalDateTime pick_time, String pick_up_address, Long product_id, int quantity, int total_price, Long user_id, String destination_address, String product_name) {
        this.order_id = order_id;
        this.created_at = created_at;
        this.message = message;
        this.order_status = order_status;
        this.phone_number = phone_number;
        this.pick_time = pick_time;
        this.pick_up_address = pick_up_address;
        this.product_id = product_id;
        this.quantity = quantity;
        this.total_price = total_price;
        this.user_id = user_id;
        this.destination_address = destination_address;
        this.product_name = product_name;
    }

    public OrderDtos() {
    }
}
