package com.fusion.backend.controller;

import com.fusion.backend.entity.Post;
import com.fusion.backend.entity.Topic;
import com.fusion.backend.entity.User;
import com.fusion.backend.request.PostRequest;
import com.fusion.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    public User getCurrentUser() {
         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

      @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<Page<Post>> getAllPosts(Pageable pageable, @RequestParam(required = false) String type) {
        Page<Post> posts;
        if (type == null) {
            posts = postService.getAllPosts(pageable);
        } else {
            posts = postService.getPostsByType(type, pageable);
        }
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest) {
         Post createdPost = postService.createPost(postRequest, getCurrentUser());
         return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }
}