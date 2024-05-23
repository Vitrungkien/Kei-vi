package com.OneBpy.controller;

//import ch.qos.logback.core.model.Model;
import com.OneBpy.dtos.*;
import com.OneBpy.models.Notice;
import com.OneBpy.models.Product;
import com.OneBpy.models.ResponseObject;
import com.OneBpy.repositories.*;
import com.OneBpy.dtos.StopDtoList;
import com.OneBpy.services.SellerService;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.aspectj.runtime.reflect.Factory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/management")
@Controller
@RequiredArgsConstructor
@CrossOrigin("*")
public class SellerController {
    private final SellerService sellerService;
    private static final Logger logger = LoggerFactory.getLogger(SellerController.class);
    // Xac nhan don hang
    @PostMapping("/my-store/{order_id}/except")
    public ResponseEntity<ResponseObject> except(@PathVariable("order_id") Long order_id,
                                                 @RequestBody UpdatedOrder updatedOrder) {
        return ResponseEntity.ok(
                new ResponseObject(
                        "ok",
                        "Update order status successfully",
                        sellerService.exceptedOrder(order_id, updatedOrder)
                )
        );
    }

    //    Thêm sản phẩm
    @PostMapping("/my-store/add-product")
    public ResponseEntity<ResponseObject> addProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(
                new ResponseObject(
                        "ok",
                        "Add product successfully",
                        sellerService.addProduct(productDTO)
                )
        );
    }

    //Cập nhật sản phẩm restful
    @PostMapping("/my-store/{product_id}/update-product")
    public ResponseEntity<ResponseObject> updateProduct(@PathVariable("product_id") Long product_id,
                                @RequestBody ProductDTO productDTO) {
        Product updatedProduct = sellerService.updateProduct(productDTO, product_id);
        return ResponseEntity.ok(
                new ResponseObject("ok", "Update product successfully", updatedProduct)
        );
    }

    // Ẩn hiện sản phẩm
    @PostMapping("/{product_id}/display-status")
    public ResponseEntity<ResponseObject> hideP(@PathVariable("product_id") Long product_id) {
        sellerService.displayStatus(product_id);
        return ResponseEntity.ok(
                new ResponseObject("ok", "Change display status successfully", "")
        );
    }

    //Xóa mềm một sản phẩm
    @PostMapping("/{product_id}/remove")
    public ResponseEntity<ResponseObject> softRemoveProduct(@PathVariable("product_id") Long product_id) {
        sellerService.softRemoveProduct(product_id);
        return ResponseEntity.ok(
                new ResponseObject("ok", "Xoa thanh cong", "")
        );
    }

    //Thêm thông báo
    @PostMapping("/my-store/create-notice")
    public ResponseEntity<ResponseObject> createNotice(@RequestBody CreateNoticeDTO noticeDTO) {
        return ResponseEntity.ok(
                new ResponseObject("ok", "Add notice successfully", sellerService.createNotice(noticeDTO))
        );
    }

    // Cập nhật thông báo
    @PostMapping("/my-store/update-notice")
    public ResponseEntity<ResponseObject> updateNotice(@RequestBody UpdateNoticeDTO noticeDTO) {
        return ResponseEntity.ok(
                new ResponseObject("ok", "Update notice successfully", sellerService.updateNotice(noticeDTO))
        );
    }

    // Chia sẻ vị trí hiện tại
    @PostMapping("/my-store/mark-stop")
    public ResponseEntity<ResponseObject> markStop(@RequestBody List<Object> stopList) {
        logger.info("stop list: " + stopList);
        sellerService.markStop(stopList);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Mark stop successfully", "")
        );
    }

}