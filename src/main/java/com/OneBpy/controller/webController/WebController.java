package com.OneBpy.controller.webController;

import com.OneBpy.dtos.ProductDTO;
import com.OneBpy.models.Product;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.repositories.StopRepository;
import com.OneBpy.repositories.StoreRepository;
import com.OneBpy.services.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.core.AsyncContextImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
        return "main";
    }

    @GetMapping("/order")
    public String Order() {
        return "order";
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @GetMapping("/signup")
    public String showFormSignup() {
        return "signup";
    }
    @GetMapping("/profile")
    public String showProfile() {
        return "profile";
    }

    @GetMapping("/signup-seller")
    public String showFormSignupSeller() {
        return "signup-seller";
    }

    @GetMapping("/management")
    public String management() {
        return "management";
    }

    @GetMapping("/management-order")
    public String managementOrder() {
        return "management-order";
    }

    @GetMapping("/management-notice")
    public String managementNotice() {
        return "management-notice";
    }

    @GetMapping("/management/add-product")
    public String addProduct() {
        return "add-product";
    }


    //trang cập nhật sản phẩm
    @GetMapping("/management/{product_id}/update-product")
    public String updateProduct(@PathVariable("product_id") Long productId) {
        // Thực hiện các xử lý cần thiết dựa trên productId
        return "update-product";
    }


    @GetMapping("/main")
    public String main() {
        return "main";
    }

//    @GetMapping("/all-product")
//    public String showProductPage(@RequestParam(defaultValue = "0") int page, Model model) {
//        Page<Product> products = userService.getAllProducts(page, 10); // Số sản phẩm trên mỗi trang
//        model.addAttribute("products", products);
//        return "main";
//    }

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
