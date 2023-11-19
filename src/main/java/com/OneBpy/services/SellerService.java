package com.OneBpy.services;

import com.OneBpy.dtos.AddProductRequest;
import com.OneBpy.dtos.AddStopRequest;
import com.OneBpy.dtos.EditStore;
import com.OneBpy.models.*;


import java.util.List;

public interface SellerService {
    Product getProductDetails(Long product_id);
    Product addProduct(AddProductRequest addProductRequest);
    Product updateProduct(AddProductRequest addProductRequest, Long product_id);
    List<Stop> getStopList(Long product_id);
    Stop addStop(AddStopRequest addStopRequest, Long product_id);
    Stop updateStop(AddStopRequest addStopRequest, Long stop_id);
    Product getProductById(Long product_id);
    Stop getStopById(Long stop_id);
    Boolean deleteStop(Long stop_id);
    Store editStore(EditStore editStore);

    Store creatStore(User seller);

}
