package com.OneBpy.services;

import com.OneBpy.dtos.JwtAuthenticationResponse;
import com.OneBpy.dtos.RefreshTokenRequest;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;


public interface JWTService {
    String extractUserName(String token);
    String generateToken(UserDetails userDetails);
    boolean isTokenValid(String token, UserDetails userDetails);
    String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails);
    // Need lowercase at first character or it will not be used

}
