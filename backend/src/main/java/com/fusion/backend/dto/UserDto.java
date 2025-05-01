package com.fusion.backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String displayName;
    private String avatarUrl;
}