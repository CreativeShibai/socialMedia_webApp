package com.fusion.backend.repository;

import com.fusion.backend.entity.QuestionThread;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionThreadRepository extends JpaRepository<QuestionThread, UUID> {
}