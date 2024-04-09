package com.OneBpy.dtos;

import com.OneBpy.models.Role;
import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;
    private String role;

}
