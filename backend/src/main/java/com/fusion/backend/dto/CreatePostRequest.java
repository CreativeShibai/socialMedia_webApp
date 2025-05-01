package com.fusion.backend.dto;

import com.fusion.backend.model.PostType;
import lombok.Data;

@Data
public class CreatePostRequest {
    private String content;
    private PostType type;
    private String imageUrl; // Or handle as MultipartFile later
    private Long topicId;
    private Long parentId;
}