package com.fusion.backend.controller;

import com.fusion.backend.dto.LoginRequest;
import com.fusion.backend.dto.RegisterRequest;
import com.fusion.backend.dto.UserDto; // To return user info on login/register
import com.fusion.backend.dto.AuthResponse; // We need this DTO for JWT
import com.fusion.backend.model.User;
import com.fusion.backend.service.AuthService;
import java.util.Optional; // Import Optional
import org.modelmapper.ModelMapper; // For mapping User to UserDto
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow requests from any origin (adjust for production)
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ModelMapper modelMapper; // Need to configure ModelMapper bean

    // TODO: Implement JWT generation and return AuthResponse

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            User registeredUser = authService.registerUser(registerRequest);
            UserDto userDto = modelMapper.map(registeredUser, UserDto.class);
            // In a real JWT setup, you'd return a token here
            // AuthResponse authResponse = new AuthResponse(jwtToken, userDto);
            return ResponseEntity.ok(userDto); // Return UserDto for now
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<com.fusion.backend.model.User> userOptional = authService.loginUser(loginRequest);

        if (userOptional.isPresent()) {
            com.fusion.backend.model.User user = userOptional.get();
            UserDto userDto = modelMapper.map(user, UserDto.class);
            // In a real JWT setup, you'd include the token:
            // String jwtToken = generateToken(user); // Placeholder for token generation
            // AuthResponse authResponse = new AuthResponse(jwtToken, userDto);
            AuthResponse authResponse = new AuthResponse(null, userDto); // Pass null for token for now
            return ResponseEntity.ok(authResponse);
        } else {
            AuthResponse errorResponse = new AuthResponse("Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}