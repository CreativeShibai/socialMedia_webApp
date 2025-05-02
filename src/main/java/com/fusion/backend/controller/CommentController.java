package com.fusion.backend.controller;

import com.fusion.backend.entity.Comment;
import com.fusion.backend.entity.Post;
import com.fusion.backend.entity.User;
import com.fusion.backend.request.CommentRequest;
import com.fusion.backend.service.CommentService;
import com.fusion.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.UUID;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/{postId}/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<?> createComment(@PathVariable String postId,
                                           @RequestBody CommentRequest commentRequest,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        return postService.getPostById(UUID.fromString(postId))
                .map(post -> {
                    try {
                        User user = (User) userDetails;
                        Comment comment = commentService.createComment(post, commentRequest.getContent(), user);
                        return new ResponseEntity<>(comment, HttpStatus.CREATED);
                    } catch (Exception e) {
                        return new ResponseEntity<>("Error creating comment", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                })
                .orElseGet(() -> new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND));

    }

}
