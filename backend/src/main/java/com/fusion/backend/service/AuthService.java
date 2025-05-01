package com.fusion.backend.service;

import com.fusion.backend.dto.LoginRequest;
import com.fusion.backend.dto.RegisterRequest;
import com.fusion.backend.model.User;
import com.fusion.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // AuthenticationManager might be needed for login if we implement full JWT flow
    // @Autowired
    // private AuthenticationManager authenticationManager;

    @Transactional
    public User registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setDisplayName(registerRequest.getDisplayName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        // Set default avatar or leave null
        // user.setAvatarUrl("...");

        return userRepository.save(user);
    }

    // Basic login check - More sophisticated version needed for JWT generation
    public Optional<User> loginUser(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // Authentication successful for basic check
                // For full JWT: Use AuthenticationManager here
                /*
                 * Authentication authentication = authenticationManager.authenticate(
                 * new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                 * loginRequest.getPassword()));
                 * SecurityContextHolder.getContext().setAuthentication(authentication);
                 * // Generate JWT token
                 */
                return userOptional;
            }
        }
        return Optional.empty(); // Authentication failed
    }

    public Optional<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            return Optional.empty();
        }
        String username = ((org.springframework.security.core.userdetails.User) authentication.getPrincipal())
                .getUsername();
        return userRepository.findByUsername(username);
    }
}