package com.fusion.backend.controller;

import com.fusion.backend.entity.Like;
import com.fusion.backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/post")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/{postId}/like")
    public ResponseEntity<Like> createLike(@PathVariable UUID postId) {
        Like like = likeService.createLike(postId);
        return new ResponseEntity<>(like, HttpStatus.CREATED);
    }
}