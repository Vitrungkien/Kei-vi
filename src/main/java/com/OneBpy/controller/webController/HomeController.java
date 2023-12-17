package com.OneBpy.controller.webController;

import com.OneBpy.dtos.PDTO;
import com.OneBpy.dtos.ProductDTO;
import com.OneBpy.dtos.ProductDTOS;
import com.OneBpy.models.Notice;
import com.OneBpy.models.Order;
import com.OneBpy.models.Product;
import com.OneBpy.models.Stop;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class HomeController {
    private final ProductRepository productRepository;
    private final UserService userService;


    @GetMapping("/all-product")
    List<PDTO> getAllProduct(){
        List<Product> productList =  productRepository.findAllActiveProducts();
        List<PDTO> pdtos = new ArrayList<>();
        for (Product product : productList) {
             Long productID = product.getProductID();
             String productName = product.getProductName();
             String productImage = product.getProductImage();
             int remainSeat = product.getRemainSeat();
             boolean display = product.isDisplay();
             String bienSoXe = product.getBienSoXe();
             String phoneNumber = product.getPhoneNumber();
             String phoneNumber2 = product.getPhoneNumber2();
             String description = product.getDescription();
             String policy = product.getPolicy();
             String tienIch = product.getTienIch();
             String type = product.getType();
             int price = product.getPrice();
             LocalTime startTime = product.getStartTime();
             LocalTime endTime = product.getEndTime();
             String startAddress = product.getStartAddress();
             String endAddress = product.getEndAddress();
             boolean deleted = product.isDeleted();
             Date lastUpdate = product.getLastUpdate();
             Date createdAt = product.getCreatedAt();
             List<Stop> stopList = product.getStopList();
             List<Notice> noticeList = product.getNoticeList();
             List<Order> orderList = product.getOrderList();
             String storeName = product.getStore().getStoreName();
             pdtos.add(new PDTO(productID, productName, productImage, remainSeat, display,
                     bienSoXe, phoneNumber, phoneNumber2, description, policy, tienIch, type, price,
                     startTime, endTime, startAddress, endAddress, deleted, lastUpdate, createdAt, stopList,
                     noticeList, orderList, storeName));
        }
        return pdtos;
    }



}
