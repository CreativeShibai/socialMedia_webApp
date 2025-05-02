package com.fusion.backend.repository;

import com.fusion.backend.entity.Post;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {

    Page<Post> findByType(String type, Pageable pageable);

    Page<Post> findByContentContaining(String keyword, Pageable pageable);

}