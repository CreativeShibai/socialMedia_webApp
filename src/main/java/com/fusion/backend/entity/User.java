package com.fusion.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name = "users")
public class User {

    @Id    
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String display_name;

    private String avatar_url;
    
    private String bio;

    @Column(nullable = false, updatable = false)
    private LocalDateTime created_at;
    
    @Column(nullable = false)
    private LocalDateTime updated_at;

    public User() {        
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.email = "";
        this.display_name = "";
        this.avatar_url = "";
        this.bio = "";
        this.created_at = LocalDateTime.now();
        this.updated_at = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }
    public UUID getId() {
    return id;
}

public void setId(UUID id) {
    this.id = id;
}

public String getUsername() {
    return username;
}

public void setUsername(String username) {
    this.username = username;
}

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplay_name() {
        return display_name;
    }

    public void setDisplay_name(String display_name) {
        this.display_name = display_name;
    }

    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

public LocalDateTime getCreated_at() {
    return created_at;
}

public void setCreated_at(LocalDateTime created_at) {
    this.created_at = created_at;
}

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }
}