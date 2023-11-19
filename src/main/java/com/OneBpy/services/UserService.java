package com.OneBpy.services;

import com.OneBpy.dtos.OrderRequest;
import com.OneBpy.models.Order;
import com.OneBpy.models.Product;
import com.OneBpy.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailsService();
    User editProfile(User user);

    User getCurrentUser();

    List<Order> getCart();

    User getUserById(Long user_id);

    Order createOrder(Long product_id, OrderRequest orderRequest);
    //List<Product> findProductsByTimeAndAddress(String startTime, String endTime, String address);
}
