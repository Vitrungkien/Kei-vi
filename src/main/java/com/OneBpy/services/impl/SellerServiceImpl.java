package com.OneBpy.services.impl;

import com.OneBpy.dtos.AddProductRequest;
import com.OneBpy.dtos.AddStopRequest;
import com.OneBpy.dtos.EditStore;
import com.OneBpy.models.*;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.repositories.StopRepository;
import com.OneBpy.repositories.StoreRepository;
import com.OneBpy.repositories.UserRepository;
import com.OneBpy.services.SellerService;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
    private final ProductRepository productRepository;
    private final StopRepository stopRepository;
    private final StoreRepository storeRepository;
    private UserService userService;

    @Autowired
    public void setUserService(@Lazy UserService userService) {
        this.userService = userService;
    }

    @Override
    public Product addProduct(AddProductRequest addProductRequest) {
        Product newProduct = new Product();
        putProduct(newProduct, addProductRequest);
        newProduct.setStore(userService.getCurrentUser().getStore());
        return productRepository.save(newProduct);
    }

    @Override
    public Product updateProduct(AddProductRequest addProductRequest, Long product_id) {
        Optional<Product> product = productRepository.findById(product_id);
        Product updateProduct = product.get();
        putProduct(updateProduct, addProductRequest);
        return productRepository.save(updateProduct);
    }

    public void putProduct(Product updateProduct, AddProductRequest addProductRequest) {
        updateProduct.setProductName(addProductRequest.getProductName());
        updateProduct.setProductImage(addProductRequest.getProductImage());
        updateProduct.setRemainSeat(addProductRequest.getRemainSeat());
        updateProduct.setDisplay(false);
        updateProduct.setBienSoXe(addProductRequest.getBienSoXe());
        updateProduct.setPhoneNumber(addProductRequest.getPhoneNumber());
        updateProduct.setDescription(addProductRequest.getDescription());
        updateProduct.setPrice(addProductRequest.getPrice());
        updateProduct.setStartTime(addProductRequest.getStartTime());
        updateProduct.setEndTime(addProductRequest.getEndTime());
        updateProduct.setStartAddress(addProductRequest.getStartAddress());
        updateProduct.setEndAddress(addProductRequest.getEndAddress());
    }

    @Override
    public Stop addStop(AddStopRequest addStopRequest, Long product_id) {
        Stop newStop = new Stop();
        newStop.setStopTime(addStopRequest.getStopTime());
        newStop.setStopAddress(addStopRequest.getStopAddress());
        Optional<Product> product = productRepository.findById(product_id);
        newStop.setProduct(product.get());
        return stopRepository.save(newStop);
    }

    @Override
    public Stop updateStop(AddStopRequest addStopRequest, Long stop_id) {
        Stop updateStop = getStopById(stop_id);
        updateStop.setStopTime(addStopRequest.getStopTime());
        updateStop.setStopAddress(addStopRequest.getStopAddress());
        return stopRepository.save(updateStop);
    }

    @Override
    public Product getProductDetails(Long product_id) {
        Product product =  getProductById(product_id);
        return product;
    }

    @Override
    public List<Stop> getStopList(Long product_id) {
        Product product = getProductById(product_id);
        List<Stop> stopList = product.getStopList();
        return stopList;
    }

    @Override
    public Product getProductById(Long product_id) {
        Optional<Product> productOptional = productRepository.findById(product_id);
        return productOptional.get();
    }

    @Override
    public Stop getStopById(Long stop_id) {
        Optional<Stop> stop = stopRepository.findById(stop_id);
        return stop.get();
    }

    @Override
    public Boolean deleteStop(Long stop_id) {
        boolean exists = stopRepository.existsById(stop_id);
        if (exists) {
            stopRepository.deleteById(stop_id);
                return true;
        }
        return false;
    }

    @Override
    public Store editStore(EditStore editStore) {
        Store editedStore = userService.getCurrentUser().getStore();
        editedStore.setStoreName(editStore.getStoreName());
        editedStore.setIntroduce(editStore.getIntroduce());
        editedStore.setPhoneNumber(editStore.getPhoneNumber());
        return storeRepository.save(editedStore);
    }

    @Override
    public Store creatStore(User newSeller) {
        Store newStore = new Store();
        newStore.setStoreName(newSeller.getLastName() + " Store");
        newStore.setIntroduce("");
        newStore.setPhoneNumber(newSeller.getPhoneNumber());
        return storeRepository.save(newStore);
    }

}
