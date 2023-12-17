package com.OneBpy.services.impl;

import com.OneBpy.dtos.OrderRequest;
import com.OneBpy.models.Order;
import com.OneBpy.models.Product;
import com.OneBpy.models.User;
import com.OneBpy.repositories.OrderRepository;
import com.OneBpy.repositories.ProductRepository;
import com.OneBpy.repositories.UserRepository;
import com.OneBpy.services.SellerService;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private SellerService sellerService;

    @Autowired
    public void setSellerService(@Lazy SellerService sellerService) {
        this.sellerService = sellerService;
    }

//    @Override
//    public UserDetailsService userDetailsService() {
//        return email -> userRepository.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));
//    }

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) {
                return userRepository.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));
            }
        };
    }

    @Override
    public User editProfile(User updateUser) {
        // Lấy thông tin người dùng đang đăng nhập
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        // Cập nhật thông tin người dùng
        Optional<User> user = userRepository.findByEmail(currentPrincipalName);
        User newUser = null;
        if (user.isPresent()) {
            newUser = user.get();
        }
        newUser.setFirstName(updateUser.getFirstName());
        newUser.setLastName(updateUser.getLastName());
        newUser.setPhoneNumber(updateUser.getPhoneNumber());

        //Lưu người dùng vào cơ sở dữ liệu
        return userRepository.save(newUser);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Optional<User> user = userRepository.findByEmail(currentPrincipalName);
        return user.get();
    }

    @Override
    public List<Order> getCart() {
        User user = getCurrentUser();
        List<Order> orderList = user.getOrderList();
        return orderList;
    }

    @Override
    public User getUserById(Long user_id) {
        Optional<User> user = userRepository.findById(user_id);
        return user.get();
    }

    @Override
    public Order createOrder(Long product_id, OrderRequest orderRequest) {
        Order newOrder = new Order();
        newOrder.setPickUpAddress(orderRequest.getPickUpAddress());
        newOrder.setDestinationAddress(orderRequest.getDestinationAddress());
        newOrder.setPickTime(orderRequest.getPickTime());
        newOrder.setMessage(orderRequest.getMessage());
        newOrder.setQuantity(orderRequest.getQuantity());
        newOrder.setPhoneNumber(orderRequest.getPhoneNumber());
        newOrder.setOrderStatus("Chờ xác nhận");
        newOrder.setUser(getCurrentUser());
        Product product = sellerService.getProductById(product_id);
        int price = product.getPrice();
        newOrder.setPrice(price);
        newOrder.setTotalPrice(price*orderRequest.getQuantity());
        newOrder.setProduct(product);
        int remainSeat = product.getRemainSeat();
        remainSeat -= orderRequest.getQuantity();
        product.setRemainSeat(remainSeat);
        productRepository.save(product);
        return orderRepository.save(newOrder);
    }

    @Override
    public Page<Product> getAllProducts(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return productRepository.findAll(pageable);
    }

}
