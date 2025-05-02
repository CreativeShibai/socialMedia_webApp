package com.fusion.backend.service;

import com.fusion.backend.entity.Topic;
import com.fusion.backend.entity.Post;
import com.fusion.backend.entity.User;
import com.fusion.backend.repository.PostRepository;
import com.fusion.backend.repository.UserRepository;
import com.fusion.backend.request.PostRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fusion.backend.exception.ResourceNotFoundException;

import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final TopicService topicService;

    public PostService(PostRepository postRepository, UserRepository userRepository, TopicService topicService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.topicService = topicService;
    }

    public Page<Post> getAllPosts(int page, int size) {        
        Pageable pageable = PageRequest.of(page, size);
        return postRepository.findAll(pageable);
    }

    public Page<Post> getPostsByType(String type, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return postRepository.findByType(type, pageable);
    }

    @Transactional
    public Post createPost(PostRequest postRequest) {
        User currentUser = getCurrentUser();

        if (currentUser == null) {
            throw new ResourceNotFoundException("Current User not found.");
        }

        User author = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + currentUser.getId()));
        
        Post post = new Post();
        post.setId(UUID.randomUUID());
        post.setContent(postRequest.getContent());
        post.setType(postRequest.getType());
        post.setAuthor(author);
        post.setCreated_at(LocalDateTime.now());
        post.setUpdated_at(LocalDateTime.now());
        if (postRequest.getTopicId()!=null) {
            Topic topic = topicService.getTopicById(postRequest.getTopicId());
            post.setTopic(topic);
        }
        
        return postRepository.save(post);

    }
    
    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}