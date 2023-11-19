package com.OneBpy.controller.webController;

import com.OneBpy.models.Product;
import com.OneBpy.models.User;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.repositories.StopRepository;
import com.OneBpy.repositories.StoreRepository;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Controller
@RequiredArgsConstructor
@RequestMapping("")
public class WebController {
    private final ProductRepository productRepository;
    private final StopRepository stopRepository;
    private final StoreRepository storeRepository;
    private final UserService userService;
    @GetMapping("/")
    public String Home() {
        return "index";
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam("startTime") String startTime,
            @RequestParam("endTime") String endTime,
            @RequestParam("startAddress") String startAddress,
            @RequestParam("endAddress") String endAddress) {

        try {
            List<Product> products = productRepository.findProductsByTimeAndAddress(startTime, endTime, startAddress, endAddress);

            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            // Xử lý lỗi nếu có
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
