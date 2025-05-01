package com.fusion.backend.repository;

import com.fusion.backend.model.Post;
import com.fusion.backend.model.PostType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // Find posts by type (for tabs)
    Page<Post> findByType(PostType type, Pageable pageable);

    // Find posts by author
    Page<Post> findByAuthorId(Long authorId, Pageable pageable);

    // Find posts by topic
    Page<Post> findByTopicId(Long topicId, Pageable pageable);

    // Find posts by parent (for replies/answers)
    Page<Post> findByParentId(Long parentId, Pageable pageable);
}