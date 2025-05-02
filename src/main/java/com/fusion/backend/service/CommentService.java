package com.fusion.backend.service;

import com.fusion.backend.entity.Comment;
import com.fusion.backend.entity.Post;
import com.fusion.backend.entity.User;
import com.fusion.backend.repository.CommentRepository;
import com.fusion.backend.repository.PostRepository;
import com.fusion.backend.repository.UserRepository;
import com.fusion.backend.request.CommentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;
import java.util.Optional;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment createComment(UUID postId, CommentRequest commentRequest) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new RuntimeException("Post not found with id: " + postId);
        }
        Post post = optionalPost.get();
    

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with username: "+username);
        }

        User user = optionalUser.get();

        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        LocalDateTime now = LocalDateTime.now();
        comment.setCreatedAt(now);
        comment.setUpdatedAt(now);
        comment.setPost(post);
        comment.setUser(user);
        return commentRepository.save(comment);
    }
}