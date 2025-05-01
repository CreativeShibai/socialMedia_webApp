package com.fusion.backend.service;

import com.fusion.backend.dto.PostDto; // We'll create this DTO later
import com.fusion.backend.dto.CreatePostRequest; // We'll create this DTO later
import com.fusion.backend.model.Post;
import com.fusion.backend.model.User;
import com.fusion.backend.model.Topic;
import com.fusion.backend.repository.PostRepository;
import com.fusion.backend.repository.UserRepository;
import com.fusion.backend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private AuthService authService; // To get current user

    @Transactional
    public Post createPost(CreatePostRequest createPostRequest) {
        User currentUser = authService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("User not authenticated"));

        Post newPost = new Post();
        newPost.setContent(createPostRequest.getContent());
        newPost.setType(createPostRequest.getType());
        newPost.setAuthor(currentUser);

        if (createPostRequest.getImageUrl() != null) {
            newPost.setImageUrl(createPostRequest.getImageUrl()); // Handle image upload later
        }

        if (createPostRequest.getTopicId() != null) {
            Topic topic = topicRepository.findById(createPostRequest.getTopicId())
                    .orElseThrow(() -> new RuntimeException("Topic not found"));
            newPost.setTopic(topic);
        }

        if (createPostRequest.getParentId() != null) {
            Post parentPost = postRepository.findById(createPostRequest.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent post not found"));
            newPost.setParent(parentPost);
            // Increment parent's comment count - might move to a separate method or trigger
            parentPost.setCommentsCount(parentPost.getCommentsCount() + 1);
            postRepository.save(parentPost);
        }

        return postRepository.save(newPost);
    }

    // Basic find all posts - needs DTO mapping and handling user-specific data
    // (isLiked, userVote)
    public Page<Post> findAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    public Optional<Post> findPostById(Long id) {
        return postRepository.findById(id);
    }

    // Add methods for fetching posts by type, author, topic etc.
    // Add methods for like/unlike, vote, delete
    // Add DTO mapping logic
}