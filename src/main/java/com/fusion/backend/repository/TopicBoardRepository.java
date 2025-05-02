package com.fusion.backend.repository;

import com.fusion.backend.entity.TopicBoard;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TopicBoardRepository extends JpaRepository<TopicBoard, UUID> {
}