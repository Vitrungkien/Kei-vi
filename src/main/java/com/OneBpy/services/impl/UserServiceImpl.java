package com.OneBpy.services.impl;

import com.OneBpy.dtos.OrderRequest;
import com.OneBpy.models.Order;
import com.OneBpy.models.Product;
import com.OneBpy.models.Store;
import com.OneBpy.models.User;
import com.OneBpy.repositories.OrderRepository;
import com.OneBpy.repositories.UserRepository;
import com.OneBpy.services.SellerService;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
    private SellerService sellerService;

    @Autowired
    public void setSellerService(@Lazy SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
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
        newOrder.setDetinationAddress(orderRequest.getDetinationAddress());
        newOrder.setPickTime(orderRequest.getPickTime());
        newOrder.setMessage(orderRequest.getMessage());
        newOrder.setQuantity(orderRequest.getQuantity());
        newOrder.setPhoneNumber(orderRequest.getPhoneNumber());
        newOrder.setOrderStatus("Chờ duyệt");
        newOrder.setUser(getCurrentUser());
        Product product = sellerService.getProductById(product_id);
        newOrder.setProduct(product);
        return orderRepository.save(newOrder);
    }

}
