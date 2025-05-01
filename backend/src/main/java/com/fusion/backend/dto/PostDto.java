package com.fusion.backend.dto;

import com.fusion.backend.model.PostType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostDto {
    private Long id;
    private PostType type;
    private String content;
    private String imageUrl;
    private UserDto author; // Embed author details
    // Include topic info if needed
    // private TopicDto topic;
    private Long parentId;
    private int likesCount;
    private int commentsCount;
    private int voteScore;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Fields specific to the viewing user
    private Boolean isLiked;
    private Integer userVote; // 1 for up, -1 for down, 0 or null for no vote
}