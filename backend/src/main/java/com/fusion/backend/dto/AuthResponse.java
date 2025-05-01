package com.fusion.backend.dto;

import lombok.Data;
import lombok.Data;
import lombok.NoArgsConstructor; // Added for flexibility if needed

@Data
@NoArgsConstructor // Can be useful
public class AuthResponse {
    private String jwtToken;
    private UserDto user;
    private String message; // Field for error messages

    // Constructor for successful authentication (token might be null initially)
    public AuthResponse(String jwtToken, UserDto user) {
        this.jwtToken = jwtToken;
        this.user = user;
        this.message = null; // No error message on success
    }

    // Constructor for authentication errors
    public AuthResponse(String message) {
        this.jwtToken = null;
        this.user = null;
        this.message = message;
    }
}