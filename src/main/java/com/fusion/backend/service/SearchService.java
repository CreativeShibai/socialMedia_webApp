package com.fusion.backend.service;

import com.fusion.backend.entity.Post;
import com.fusion.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class SearchService {

    private final PostRepository postRepository;

    @Autowired
    public SearchService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Page<Post> searchPosts(String keyword, Pageable pageable) {
        return postRepository.findByContentContainingIgnoreCase(keyword,pageable);
    }
}