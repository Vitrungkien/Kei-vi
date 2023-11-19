package com.OneBpy.controller.webController;

import com.OneBpy.dtos.AddProductRequest;
import com.OneBpy.dtos.AddStopRequest;
import com.OneBpy.dtos.EditStore;
import com.OneBpy.models.Product;
import com.OneBpy.models.ResponseObject;
import com.OneBpy.models.Stop;
import com.OneBpy.models.Store;
import com.OneBpy.repositories.*;
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
public class SellerController {
    private final UserService userService;
    private final SellerService sellerService;

    //Get store info (active)
    @GetMapping("/my-store")
    Store getStore() {
        return ((userService.getCurrentUser().getStore()));
    }

    //Edit store (active)
    @PutMapping("/my-store/edit")
    public ResponseEntity<ResponseObject> editStore(@RequestBody EditStore editStore) {
        Store editedStore = sellerService.editStore(editStore);
        return ResponseEntity.ok(new ResponseObject("ok", "Edit Store successfully", editedStore));
    }

    //Get product list (active)
    @GetMapping("/my-store/all-product")
    List<Product> getAllProduct(){
        return ((userService.getCurrentUser().getStore()).getProductList());
    }

    //Product details (active)
    @GetMapping("/my-store/{product_id}")
    ResponseEntity<Product> productDetails(@PathVariable("product_id") Long product_id) {
        return ResponseEntity.ok(sellerService.getProductDetails(product_id));
    }

    //Add a product (active)
    @PostMapping("/my-store/add-product")
    ResponseEntity<Product> addProduct(@RequestBody AddProductRequest addProductRequest) {
        return ResponseEntity.ok(sellerService.addProduct(addProductRequest));
    }

    //Update product (active)
    @PutMapping("/my-store/{product_id}/update-product")
    ResponseEntity<Product> updateProduct(@RequestBody AddProductRequest addProductRequest,
                                          @PathVariable("product_id") Long product_id) {
        return ResponseEntity.ok(sellerService.updateProduct(addProductRequest, product_id));
    }

    //Get stop list (active)
    @GetMapping("/my-store/{product_id}/stop-list")
    ResponseEntity<List<Stop>> getStopList(@PathVariable("product_id") Long product_id) {
        return ResponseEntity.ok(sellerService.getStopList(product_id));
    }
    //Add a stop (active)
    @PostMapping("/my-store/{product_id}/update-product/add-stop")
    ResponseEntity<Stop> addStop(@RequestBody AddStopRequest addStopRequest,
                                 @PathVariable("product_id") Long product_id) {
      return ResponseEntity.ok(sellerService.addStop(addStopRequest, product_id));
    }

    //Update stop (active)
    @PutMapping("/my-store/{product_id}/update-product/{stop_id}")
    ResponseEntity<Stop> updateStop(@RequestBody AddStopRequest addStopRequest,
                                    @PathVariable("stop_id") Long stop_id, @PathVariable Long product_id) {
        return ResponseEntity.ok(sellerService.updateStop(addStopRequest, stop_id));
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



}