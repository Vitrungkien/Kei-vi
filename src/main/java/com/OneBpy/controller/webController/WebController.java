package com.OneBpy.controller.webController;

import com.OneBpy.dtos.PDTO;
import com.OneBpy.dtos.ProductDTO;
import com.OneBpy.models.Product;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.repositories.StopRepository;
import com.OneBpy.repositories.StoreRepository;
import com.OneBpy.response.SearchForm;
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

import java.time.LocalTime;
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
    public String Home(Model model) {
        model.addAttribute("searchForm", new SearchForm());
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

    @GetMapping("/search-form")
    public String showSearchForm(Model model) {
        model.addAttribute("searchForm", new SearchForm());
        return "search";
    }

    @GetMapping("/search")
    public String searchProducts(@ModelAttribute("searchForm") SearchForm searchForm, Model model) {
        LocalTime startTime2 = searchForm.getStartTime1().plusHours(1);
        List<Product> productList = productRepository.findProductsByTimeAndAddress(
                searchForm.getStartTime1(), startTime2,
                searchForm.getStartAddress(), searchForm.getEndAddress()
        );
        List<PDTO> products = userService.getAllProduct(productList);
        model.addAttribute("products", products);
        return "search";
    }
}
