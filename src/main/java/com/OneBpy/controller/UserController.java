package com.OneBpy.controller;

import com.OneBpy.dtos.OrderRequest;
import com.OneBpy.models.Order;
import com.OneBpy.models.Product;
import com.OneBpy.models.ResponseObject;
import com.OneBpy.repositories.OrderRepository;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.services.OrderDto;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    // Dat hang (active)
    @PostMapping("/{product_id}/order")
    public String creatOrder(@PathVariable("product_id") Long product_id,
                             @ModelAttribute OrderRequest orderRequest)
    {
        userService.createOrder(product_id, orderRequest);
        return "redirect:/";
    }


    //Search product by time and address
    @GetMapping("/{product_id}")
    public ResponseEntity<Product> getProductByID(@PathVariable("product_id") Long product_id) {
        Optional<Product> product = productRepository.findById(product_id);
        return ResponseEntity.ok(product.get());
    }

}
