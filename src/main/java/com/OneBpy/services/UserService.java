package com.OneBpy.services;

import com.OneBpy.dtos.OrderRequest;
import com.OneBpy.dtos.PDTO;
import com.OneBpy.models.Order;
import com.OneBpy.models.Product;
import com.OneBpy.models.User;
import org.springframework.data.domain.Page;
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

//    Page<Product> getAllProducts(int pageNo, int pageSize);

    List<PDTO> getAllProduct(List<Product> productList);
}
