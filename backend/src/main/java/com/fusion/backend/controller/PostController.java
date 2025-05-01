package com.fusion.backend.controller;

import com.fusion.backend.dto.CreatePostRequest;
import com.fusion.backend.dto.PostDto;
import com.fusion.backend.model.Post;
import com.fusion.backend.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*") // Allow requests from any origin (adjust for production)
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<?> createPost(@Valid @RequestBody CreatePostRequest createPostRequest) {
        try {
            Post createdPost = postService.createPost(createPostRequest);
            PostDto postDto = modelMapper.map(createdPost, PostDto.class);
            // TODO: Add user-specific data (isLiked, userVote) to DTO based on current user
            return ResponseEntity.status(HttpStatus.CREATED).body(postDto);
        } catch (RuntimeException e) {
            // Consider more specific exception handling
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Page<PostDto>> getAllPosts(@PageableDefault(size = 10, sort = "createdAt,desc") Pageable pageable) {
        Page<Post> postPage = postService.findAllPosts(pageable);
        Page<PostDto> postDtoPage = postPage.map(post -> {
            PostDto dto = modelMapper.map(post, PostDto.class);
            // TODO: Add user-specific data (isLiked, userVote) to DTO based on current user
            return dto;
        });
        return ResponseEntity.ok(postDtoPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long id) {
        return postService.findPostById(id)
            .map(post -> {
                 PostDto dto = modelMapper.map(post, PostDto.class);
                 // TODO: Add user-specific data (isLiked, userVote) to DTO based on current user
                 return ResponseEntity.ok(dto);
                })
            .orElse(ResponseEntity.notFound().build());
    }

    // TODO: Add endpoints for like/unlike, vote, delete
    // TODO: Add endpoints to get posts by type, author, topic
}