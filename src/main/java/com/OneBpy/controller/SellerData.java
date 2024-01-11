package com.OneBpy.controller;

//import ch.qos.logback.core.model.Model;
import com.OneBpy.dtos.*;
import com.OneBpy.models.*;
import com.OneBpy.repositories.*;
import com.OneBpy.services.OrderDto;
import com.OneBpy.services.SellerService;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/seller")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SellerData {
    private final UserService userService;
    private final SellerService sellerService;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final NoticeRepository noticeRepository;

    // Lấy thông tin cửa hàng (checked)
    @GetMapping("/my-store")
    Store getStore() {
        return ((userService.getCurrentUser().getStore()));
    }

    //Sửa thông tin cửa hàng (checked)
    @PutMapping("/my-store/edit")
    public ResponseEntity<ResponseObject> editStore(@RequestBody EditStore editStore) {
        Store editedStore = sellerService.editStore(editStore);
        return ResponseEntity.ok(new ResponseObject("ok", "Edit Store successfully", editedStore));
    }

    //Lấy danh sách sản phẩm chưa bị xóa mềm của cửa hàng(checked)
    @GetMapping("/my-store/all-product")
    public List<PDTO> getAllProduct(){
        Long store_id = userService.getCurrentUser().getStore().getStoreID();
        List<Product> productList = productRepository.findAllStoreProducts(store_id);
        return userService.getAllProduct(productList);
    }
    //Lấy danh sách all sản phẩm của cửa hàng
//    @GetMapping("/my-store/all-product")
//    public List<Product> getAllProduct(){
//        return ((userService.getCurrentUser().getStore()).getProductList());
//    }


    //Lấy chi tiết sản phẩm by id (checked)
    @GetMapping("/my-store/{product_id}")
    ResponseEntity<Product> productDetails(@PathVariable("product_id") Long product_id) {
        return ResponseEntity.ok(sellerService.getProductById(product_id));
    }


    //Lấy danh sách điểm dừng by product_id (checked)
    @GetMapping("/my-store/{product_id}/stop-list")
    ResponseEntity<List<Stop>> getStopList(@PathVariable("product_id") Long product_id) {
        return ResponseEntity.ok(sellerService.getStopList(product_id));
    }

    //Delete stop (active)
    @DeleteMapping("/my-store/{product_id}/update-product/{stop_id}")
    ResponseEntity<ResponseObject> deleteStop(@PathVariable("stop_id") Long stop_id, @PathVariable Long product_id)
    {
        Boolean isSuccess = sellerService.deleteStop(stop_id);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Delete stop has " + stop_id + " Successfully", ""));

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find stop " + stop_id + " to delete", ""));
    }


    //Lấy tất cả đơn hàng của cửa hàng
    @GetMapping("/my-store/all-order")
    public List<OrderDto> getAllOrder() {
        Long store_id = userService.getCurrentUser().getStore().getStoreID();
        return orderRepository.getAllStoreOrder(store_id);
    }

    //Lấy tất cả thông báo của cửa hàng (checked)
    @GetMapping("/my-store/all-notices")
    public List<NoticeDTO> getAllStoreNotice() {
        Long store_id = userService.getCurrentUser().getStore().getStoreID();
        return noticeRepository.getAllStoreNotice(store_id);
    }


    //Thêm thông báo
//    @PostMapping("/my-store/create-notice")
//    public ResponseEntity<Notice> createNotice(@RequestBody CreateNoticeDTO noticeDTO) {
//        return ResponseEntity.ok(sellerService.createNotice(noticeDTO));
//    }

//    // Cập nhật thông báo
//    @PostMapping("/my-store/update-notice")
//    public ResponseEntity<Notice> updateNotice(@RequestBody UpdateNoticeDTO noticeDTO) {
//        return ResponseEntity.ok(sellerService.updateNotice(noticeDTO));
//    }

    //Xóa mềm một sản phẩm (checked)
//    @PostMapping("/{product_id}/remove")
//    public ResponseEntity<Product> softRemoveProduct(@PathVariable("product_id") Long product_id,
//                                                     @RequestBody RemoveProductDTO removeProductDTO) {
//        return ResponseEntity.ok(sellerService.softRemoveProduct(product_id, removeProductDTO));
//    }


    //Excepted order (checked)
//    @PostMapping("/my-store/{order_id}/except")
//    public String except(@PathVariable("order_id") Long order_id, @ModelAttribute OrderRequest orderRequest) {
//        sellerService.exceptedOrder(order_id, orderRequest);
//        return "redirect:/management";
//    }

    // Ẩn hiện sản phẩm (checked)
//    @PostMapping("/{product_id}/display-status")
//    public ResponseEntity<Product> hideP(@PathVariable("product_id") Long product_id,
//                        @RequestBody HideShowProduct hideShowProduct) {
//        return ResponseEntity.ok(sellerService.displayStatus(product_id, hideShowProduct));
//    }

    //Add a stop (active)
//    @PostMapping("/my-store/{product_id}/update-product/add-stop")
//    ResponseEntity<Stop> addStop(@RequestBody AddStopRequest addStopRequest,
//                                 @PathVariable("product_id") Long product_id) {
//        return ResponseEntity.ok(sellerService.addStop(addStopRequest, product_id));
//    }

    //Update stop (active)
//    @PutMapping("/my-store/{product_id}/update-product/{stop_id}")
//    ResponseEntity<Stop> updateStop(@RequestBody AddStopRequest addStopRequest,
//                                    @PathVariable("stop_id") Long stop_id, @PathVariable Long product_id) {
//        return ResponseEntity.ok(sellerService.updateStop(addStopRequest, stop_id));
//    }


    //Add a product (active)
//    @PostMapping("/my-store/add-product")
//    ResponseEntity<Product> addProduct(@ModelAttribute ProductDTO productDTO) {
//        return ResponseEntity.ok(sellerService.addProduct(productDTO));
//    }

    //Add a product (active)
//    @PostMapping("/my-store/add-product")
//    ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
//        return ResponseEntity.ok(sellerService.addProduct(productDTO));
//    }


    //Update product (active)
//    @PutMapping("/my-store/{product_id}/update-product")
//    ResponseEntity<Product> updateProduct(@RequestBody AddProductRequest addProductRequest,
//                                          @PathVariable("product_id") Long product_id) {
//        return ResponseEntity.ok(sellerService.updateProduct(addProductRequest, product_id));
//    }
//    @PostMapping("/my-store/{product_id}/update-product")
//    ResponseEntity<Product> updateProduct(@RequestBody ProductDTO productDTO,
//                                          @PathVariable("product_id") Long product_id) {
//        return ResponseEntity.ok(sellerService.updateProduct(productDTO, product_id));
//    }
}