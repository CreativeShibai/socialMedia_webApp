package com.fusion.backend.service;

import com.fusion.backend.entity.Post;
import com.fusion.backend.entity.User;
import com.fusion.backend.entity.Vote;
import com.fusion.backend.repository.PostRepository;
import com.fusion.backend.repository.UserRepository;
import com.fusion.backend.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Vote createVote(UUID postId, int value) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        Vote vote = new Vote();
        vote.setValue(value);
        vote.setPost(post);
        vote.setUser(user);
        return voteRepository.save(vote);
    }
}