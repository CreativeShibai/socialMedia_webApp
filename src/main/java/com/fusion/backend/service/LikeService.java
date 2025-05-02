package com.fusion.backend.service;

import com.fusion.backend.entity.Like;
import com.fusion.backend.entity.Post;
import com.fusion.backend.entity.User;
import com.fusion.backend.repository.LikeRepository;
import com.fusion.backend.repository.PostRepository;
import com.fusion.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Like createLike(UUID postId, UUID userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Like like = new Like();
        like.setPost(post);
        like.setUser(user);
        like.setCreated_at(LocalDateTime.now());
        like.setId(UUID.randomUUID());

        return likeRepository.save(like);
    }
}