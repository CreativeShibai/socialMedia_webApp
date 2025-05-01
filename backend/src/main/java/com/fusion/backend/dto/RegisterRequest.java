package com.fusion.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String displayName;
    private String password;
    // Frontend handles confirmPassword validation
}