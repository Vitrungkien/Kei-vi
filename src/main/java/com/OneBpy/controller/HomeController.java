package com.OneBpy.controller;

import com.OneBpy.dtos.PDTO;
import com.OneBpy.dtos.SearchByKeywordRq;
import com.OneBpy.dtos.SearchForm;
import com.OneBpy.models.Notice;
import com.OneBpy.models.Product;
import com.OneBpy.models.ResponseObject;
import com.OneBpy.repositories.NoticeRepository;
import com.OneBpy.repositories.OrderRepository;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.repositories.StoreRepository;
import com.OneBpy.services.OrderDto;
import com.OneBpy.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class HomeController {
    private final ProductRepository productRepository;
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final StoreRepository storeRepository;
    private final NoticeRepository noticeRepository;

    private static final Logger logger = LoggerFactory.getLogger(WebController.class);

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

    @PostMapping("/search-by-stop")
    public ResponseEntity<ResponseObject> search(@RequestBody Map<String, String> searchRequest) {

        List<Product> productList = new ArrayList<>();
        if (searchRequest.containsKey("keyword")) {
            String keyword = searchRequest.get("keyword");
            productList = productRepository.findByKeyword(keyword);
        } else if (searchRequest.containsKey("startAddress") && searchRequest.containsKey("endAddress") && searchRequest.containsKey("startTime1") ) {
            LocalTime startTime1 = LocalTime.parse((String)searchRequest.get("startTime1"));
            String startAddress = searchRequest.get("startAddress");
            String endAddress = searchRequest.get("endAddress");
            logger.info("Start time 1: " + startTime1.plusHours(1));
            LocalTime startTime2 = startTime1.plusHours(1);

            productList = productRepository.findProductsByTimeAndAddress(
                    startTime1, startTime2, startAddress, endAddress);

        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("Fail", "Wrong request form", "")
            );
        }

        List<PDTO> products = userService.getAllProduct(productList);
        return ResponseEntity.ok().body(
                new ResponseObject("ok", "Tim kiem thanh cong", products)
        );
    }
}

