package com.OneBpy.services;

import com.OneBpy.dtos.JwtAuthenticationResponse;
import com.OneBpy.dtos.RefreshTokenRequest;
import com.OneBpy.dtos.SignUpRequest;
import com.OneBpy.dtos.SignInRequest;
import com.OneBpy.models.User;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {

    User signUp(SignUpRequest signUpRequest);
    User signUpSeller(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signIn(SignInRequest signInRequest);
//    void logIn(SignInRequest signInRequest, HttpServletResponse response);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
