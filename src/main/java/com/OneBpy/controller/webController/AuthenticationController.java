package com.OneBpy.controller.webController;

import com.OneBpy.dtos.JwtAuthenticationResponse;
import com.OneBpy.dtos.RefreshTokenRequest;
import com.OneBpy.dtos.SignUpRequest;
import com.OneBpy.dtos.SignInRequest;
import com.OneBpy.models.ResponseObject;
import com.OneBpy.models.User;
import com.OneBpy.repositories.UserRepository;
import com.OneBpy.services.AuthenticationService;
import com.OneBpy.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@ModelAttribute("signInRequest") SignInRequest signInRequest,
                                                            HttpServletResponse response) throws IOException, JSONException {
        JwtAuthenticationResponse jwtAuthenticationResponse = authenticationService.signIn(signInRequest);
        String token = jwtAuthenticationResponse.getToken();
        // Thêm token vào cookie
        Cookie cookie = new Cookie("Authorization", token);
//        cookie.setHttpOnly(true);
        cookie.setMaxAge((int) TimeUnit.MINUTES.toSeconds(5)); // Thời gian sống của token
        cookie.setPath("/");
        response.addCookie(cookie);
        response.addHeader("Authorization", "Bearer " + token );

//        Optional<User> optionalUser = userRepository.findByEmail(signInRequest.getEmail());
//        if (optionalUser.isPresent()) {
//            response.getWriter().write(new JSONObject()
//                    .put("userId", optionalUser.get().getUserID())
//                    .put("role", optionalUser.get().getRole())
//                    .toString()
//            );
//            response.addHeader("Authorization", "Bearer " + token );
//        }
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }

//    @PostMapping("/login")
//    public void signIn(@ModelAttribute("signInRequest") SignInRequest signInRequest,
//                                                            HttpServletResponse response) {
//        JwtAuthenticationResponse jwtAuthenticationResponse = authenticationService.signIn(signInRequest);
//
//        // Thêm token vào cookie
//        Cookie cookie = new Cookie("Authorization", "Bearer " + jwtAuthenticationResponse.getToken());
//        cookie.setHttpOnly(true);
//        //cookie.setSecure(true); // Đối với HTTPS
//        cookie.setMaxAge((int) TimeUnit.MINUTES.toSeconds(5)); // Thời gian sống của token
//        cookie.setPath("/");
//        response.addCookie(cookie);
//    }





//    @PostMapping("/login")
//    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody SignInRequest signInRequest) {
//        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
//    }
//    @PostMapping("/login")
//    public void logIn(@RequestBody SignInRequest signInRequest, HttpServletResponse response) {
//         authenticationService.logIn(signInRequest, response);
//    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }

    @PostMapping("/signUpSeller")
    public ResponseEntity<ResponseObject> signupSeller(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(new ResponseObject("ok",
                "Created SELLER account successfully",
                authenticationService.signUpSeller(signUpRequest)));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

}
