package com.OneBpy.services;

import com.OneBpy.dtos.*;
import com.OneBpy.models.*;
import java.util.List;

public interface SellerService {
    Product getProductDetails(Long product_id);
    //Product addProduct(AddProductRequest addProductRequest);

    // Thêm sản phẩm
    Product addProduct(ProductDTO productDTO);

    //Cập nhật thông tin sản phẩm
    //Product updateProduct(AddProductRequest addProductRequest, Long product_id);
    Product updateProduct(ProductDTO productDTO, Long product_id);

    List<Stop> getStopList(Long product_id);
    //Stop addStop(AddStopRequest addStopRequest, Long product_id);
    Stop addStop(StopDTO stop, Long product_id);

    // Cập nhật điểm dừng
    //Stop updateStop(AddStopRequest addStopRequest, Long stop_id);
    Stop updateStop(StopDTO stopDTO, Long stop_id);

    Product getProductById(Long product_id);
    Stop getStopById(Long stop_id);
    Boolean deleteStop(Long stop_id);
    Store editStore(EditStore editStore);
    Store creatStore(User seller);

    //Cập nhật trạng thái đơn hàng
    void exceptedOrder(Long order_id, UpdatedOrder updatedOrder);

    //Cập nhật trạng thái hiển thị
    Product displayStatus(Long product_id, HideShowProduct hideShowProduct);

    Product softRemoveProduct(Long product_id, RemoveProductDTO removeProductDTO);

    Notice createNotice(CreateNoticeDTO noticeDTO);
    Notice updateNotice(UpdateNoticeDTO noticeDTO);

    void markStop(List<StopDTO> stopDTOList);
}
