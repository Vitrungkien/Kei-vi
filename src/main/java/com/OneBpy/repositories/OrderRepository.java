package com.OneBpy.repositories;

import com.OneBpy.dtos.OrderDtos;
import com.OneBpy.models.Order;
import com.OneBpy.services.OrderDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT o.order_id as orderId, o.created_at as createdAt, o.message as message " +
            ", o.order_status as orderStatus, o.phone_number as phoneNumber, o.pick_time as pickTime " +
            ", o.pick_up_address as pickUpAddress, o.quantity as quantity " +
            ",o.total_price as totalPrice " +
            ", o.user_id as userId, o.destination_address as destinationAddress " +
            ", p.product_name as productName, p.price as price, p.product_id as productId " +
            "FROM order_tb o " +
            "JOIN product_tb p ON o.product_id = p.product_id " +
            "JOIN store_tb s ON p.store_id = s.store_id " +
            "WHERE s.store_id = :store_id " +
            "ORDER BY o.created_at DESC"
            , nativeQuery = true)
    List<OrderDto> getAllStoreOrder(@Param("store_id") Long store_id);

    @Query(value = "SELECT o.order_id as orderId, o.created_at as createdAt, o.message as message " +
            ", o.order_status as orderStatus, o.phone_number as phoneNumber, o.pick_time as pickTime " +
            ", o.pick_up_address as pickUpAddress, o.quantity as quantity " +
            ", o.total_price as totalPrice " +
            ", o.user_id as userId, o.destination_address as destinationAddress " +
            ", p.product_name as productName, p.price as price, p.product_id as productId " +
            "FROM order_tb o " +
            "JOIN product_tb p ON o.product_id = p.product_id " +
            "WHERE user_id = :user_id " +
            "ORDER BY o.created_at DESC"
            , nativeQuery = true)
    List<OrderDto> getAllUserOrder(@Param("user_id") Long user_id);
}
