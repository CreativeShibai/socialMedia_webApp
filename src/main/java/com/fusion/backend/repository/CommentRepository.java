package com.fusion.backend.repository;

import com.fusion.backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

}