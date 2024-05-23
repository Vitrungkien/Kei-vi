package com.OneBpy.controller;

import com.OneBpy.dtos.*;
import com.OneBpy.models.ResponseObject;
import com.OneBpy.models.User;
import com.OneBpy.repositories.UserRepository;
import com.OneBpy.services.AuthenticationService;
import com.OneBpy.services.UserService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Enumeration;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(WebController.class);
    @PostMapping("/login")
    public ResponseEntity<ResponseObject> signIn(@RequestBody SignInRequest signInRequest,
                                                            HttpServletResponse response) throws IOException, JSONException {
        JwtAuthenticationResponse jwtAuthenticationResponse = authenticationService.logIn(signInRequest);
        String token = jwtAuthenticationResponse.getToken();
        // Thêm token vào cookie
        Cookie cookie = new Cookie("Authorization", token);
        cookie.setMaxAge((int) TimeUnit.MINUTES.toSeconds(60)); // Thời gian sống của token
        cookie.setPath("/");
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setDomain("127.0.0.1");
        response.addCookie(cookie);

        String role = jwtAuthenticationResponse.getRole();
        Cookie cookieRole = new Cookie("Role", role);
        cookieRole.setMaxAge((int) TimeUnit.MINUTES.toSeconds(60)); // Thời gian sống của token
        cookieRole.setPath("/");
        response.addCookie(cookieRole);

        response.addHeader("Role", role);
        response.addHeader("Authorization", "Bearer " + token );

        return ResponseEntity.ok().body(
                new ResponseObject("ok", "Đăng nhập thành công", jwtAuthenticationResponse)
        );
    }

    //Sign up MVC
//    @PostMapping("/signup")
//    public String signup(@ModelAttribute("signUpRequest") SignUpRequest signUpRequest) {
//        authenticationService.signUp(signUpRequest);
//        return "login";
//    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseObject> signup(@ModelAttribute SignUpRequest signUpRequest) {
        logger.info(signUpRequest.getEmail());
        return ResponseEntity.ok(
                new ResponseObject("ok", "Đăng ký tài khoản thành công"
                ,"")
        );
    }

//authenticationService.signUp(signUpRequest)
//    ResponseEntity<ResponseObject>
    @PostMapping("/signup-seller")
    public String signupSeller(@ModelAttribute("signUpRequest") SignUpRequest signUpRequest) {
        authenticationService.signUpSeller(signUpRequest);
        return "login";
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        //logger.info(String.valueOf(request.getLocalPort()));
        CookieUtil.clearCookie(response, "Authorization");
        return ResponseEntity.ok("Logout successful");
    }

}
