package com.OneBpy.controller.webController;

import com.OneBpy.dtos.PDTO;
import com.OneBpy.dtos.ProductDTO;
import com.OneBpy.dtos.ProductDTOS;
import com.OneBpy.models.Notice;
import com.OneBpy.models.Order;
import com.OneBpy.models.Product;
import com.OneBpy.models.Stop;
import com.OneBpy.repositories.OrderRepository;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.response.SearchForm;
import com.OneBpy.services.OrderDto;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class HomeController {
    private final ProductRepository productRepository;
    private final UserService userService;
    private final OrderRepository orderRepository;


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


//    @GetMapping("/search")
//    public ResponseEntity<List<PDTO>> searchProducts(
//            @RequestParam("startTime1") LocalTime startTime1,
//            @RequestParam("startAddress") String startAddress,
//            @RequestParam("endAddress") String endAddress) {
//
//        LocalTime startTime2 = startTime1.plusHours(1);
////        LocalTime endTime = startTime2;
//        try {
//            List<Product> products = productRepository.findProductsByTimeAndAddress(startTime1, startTime2, startAddress, endAddress);
//            List<PDTO> pdtoList = userService.getAllProduct(products);
//            return new ResponseEntity<>(pdtoList, HttpStatus.OK);
//        } catch (Exception e) {
//            // Xử lý lỗi nếu có
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }



}
