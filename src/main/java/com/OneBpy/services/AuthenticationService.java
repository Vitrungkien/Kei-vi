package com.OneBpy.services;

import com.OneBpy.dtos.JwtAuthenticationResponse;
import com.OneBpy.dtos.RefreshTokenRequest;
import com.OneBpy.dtos.SignUpRequest;
import com.OneBpy.dtos.SignInRequest;
import com.OneBpy.models.User;

public interface AuthenticationService {

    User signUp(SignUpRequest signUpRequest);
    User signUpSeller(SignUpRequest signUpRequest);
    JwtAuthenticationResponse logIn(SignInRequest signInRequest);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
