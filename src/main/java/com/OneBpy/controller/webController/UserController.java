package com.OneBpy.controller.webController;

import com.OneBpy.dtos.OrderRequest;
import com.OneBpy.models.Order;
import com.OneBpy.models.Product;
import com.OneBpy.models.ResponseObject;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hi user");
    }


    @GetMapping("/cart")
    public ResponseEntity<ResponseObject> getCart()
    {
        List<Order> orderList = userService.getCart();
        return ResponseEntity.ok(new ResponseObject("ok", "Get cart Successfully", orderList));
    }

    // Dat hang (active)
    @PostMapping("/{product_id}/order")
    public ResponseEntity<ResponseObject> creatOrder(@PathVariable Long product_id,
                                                     @RequestBody OrderRequest orderRequest)
    {

        Order newOrder = userService.createOrder(product_id, orderRequest);

        return ResponseEntity.ok(new ResponseObject("ok",
                "Đặt vé " + product_id + " thành công", newOrder));
    }

    //Search product by time and address

}
