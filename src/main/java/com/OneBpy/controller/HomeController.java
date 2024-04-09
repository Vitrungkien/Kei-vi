package com.OneBpy.controller;

import com.OneBpy.dtos.PDTO;
import com.OneBpy.models.Notice;
import com.OneBpy.models.Product;
import com.OneBpy.repositories.NoticeRepository;
import com.OneBpy.repositories.OrderRepository;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.repositories.StoreRepository;
import com.OneBpy.services.OrderDto;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class HomeController {
    private final ProductRepository productRepository;
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final StoreRepository storeRepository;
    private final NoticeRepository noticeRepository;

    @GetMapping("/all-product")
    List<PDTO> getAllProduct(){
        List<Product> productList =  productRepository.findAllActiveProducts();
        return userService.getAllProduct(productList);
    }

    @GetMapping("/my-orders")
    public List<OrderDto> getUserOrders()
    {
        Long userId = userService.getCurrentUser().getUserID();
        return orderRepository.getAllUserOrder(userId);
    }
    @GetMapping("/my-order/{product_id}")
    public PDTO getProductOfOrder(@PathVariable("product_id") Long product_id) {
        return userService.getProductById(product_id);
    }


    @GetMapping("/all-notice")
    public List<Notice> getAllNotice() {
        return noticeRepository.getAllActiveNotice();
    }

    @GetMapping("/all-store-name")
    public List<String> getStoreName() {
        return storeRepository.getAllStorename();
    }

}
