package com.fusion.backend.service;

import com.fusion.backend.config.JwtTokenProvider;
import com.fusion.backend.entity.User;
import com.fusion.backend.repository.UserRepository;
import com.fusion.backend.security.JwtTokenProvider;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public User register(String username, String password, String email, String displayName, String bio, String avatarUrl) {
        try {
            User user = new User();
            user.setId(UUID.randomUUID());
            user.setUsername(username);
            user.setEmail(email);
            user.setDisplayName(displayName);
            user.setBio(bio);
            user.setAvatarUrl(avatarUrl);
            user.setPassword(passwordEncoder.encode(password));
            user.setCreated_at(ZonedDateTime.now(ZoneId.of("UTC")));
            user.setUpdated_at(ZonedDateTime.now(ZoneId.of("UTC")));
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Username already exists", e);
        } catch (Exception e) {
            throw new RuntimeException("Error during user registration", e);
        }
    }
    public String login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }
}