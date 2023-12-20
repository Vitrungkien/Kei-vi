package com.OneBpy.controller.webController;

//import ch.qos.logback.core.model.Model;
import com.OneBpy.dtos.*;
import com.OneBpy.models.*;
import com.OneBpy.repositories.*;
import com.OneBpy.response.StopDtoList;
import com.OneBpy.services.OrderDto;
import com.OneBpy.services.SellerService;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
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
    private final UserService userService;
    private final SellerService sellerService;
    private final OrderRepository orderRepository;


    //Excepted order
//    @PostMapping("/my-store/{order_id}/except")
//    public String except(@PathVariable("order_id") Long order_id, @ModelAttribute OrderRequest orderRequest) {
//        sellerService.exceptedOrder(order_id, orderRequest);
//                return "redirect:/management";
//    }

    // Xac nhan don hang
    @PostMapping("/my-store/{order_id}/except")
    public String except(@PathVariable("order_id") Long order_id, @ModelAttribute UpdatedOrder updatedOrder) {
        sellerService.exceptedOrder(order_id, updatedOrder);
        return "redirect:/management-order";
    }

//    Thêm sản phẩm
    @PostMapping("/my-store/add-product")
    public String addProduct(@ModelAttribute ProductDTO productDTO) {
        sellerService.addProduct(productDTO);
        return "redirect:/management";
    }

    //Cập nhật sản phẩm
    @PostMapping("/my-store/{product_id}/update-product")
    public String updateProduct(@PathVariable("product_id") Long product_id,
                                @ModelAttribute ProductDTO productDTO) {
        sellerService.updateProduct(productDTO, product_id);
        return "redirect:/management";
    }

    // Ẩn hiện sản phẩm
    @PostMapping("/{product_id}/display-status")
    public String hideP(@PathVariable("product_id") Long product_id,
                        @ModelAttribute HideShowProduct hideShowProduct) {
        sellerService.displayStatus(product_id, hideShowProduct);
        return "redirect:/management";
    }

    //Xóa mềm một sản phẩm
    @PostMapping("/{product_id}/remove")
    public String softRemoveProduct(@PathVariable("product_id") Long product_id,
                                                     @ModelAttribute RemoveProductDTO removeProductDTO) {
        sellerService.softRemoveProduct(product_id, removeProductDTO);
        return "redirect:/management";
    }

    //Thêm thông báo
    @PostMapping("/my-store/create-notice")
    public String createNotice(@ModelAttribute CreateNoticeDTO noticeDTO) {
        sellerService.createNotice(noticeDTO);
        return "redirect:/management-notice";
    }

    // Cập nhật thông báo
    @PostMapping("/my-store/update-notice")
    public String updateNotice(@ModelAttribute UpdateNoticeDTO noticeDTO) {
        sellerService.updateNotice(noticeDTO);
        return "redirect:/management-notice";
    }


    // Chia sẻ vị trí hiện tại
    @PostMapping("/my-store/mark-stop")
    public String markStop(@ModelAttribute StopDtoList stopDtoList) {
        sellerService.markStop(stopDtoList.getStopDTOList());
        return "redirect:/management";
    }

}