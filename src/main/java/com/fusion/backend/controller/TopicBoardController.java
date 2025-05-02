package com.fusion.backend.controller;

import com.fusion.backend.entity.TopicBoard;
import com.fusion.backend.service.TopicBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/board")
public class TopicBoardController {

    @Autowired
    private TopicBoardService topicBoardService;

    @GetMapping("/{boardId}")
    public ResponseEntity<?> getTopicBoardById(@PathVariable UUID boardId) {
        try {
            TopicBoard topicBoard =topicBoardService.getTopicBoardById(boardId);
            return new ResponseEntity<>(topicBoard, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Topic board not found", HttpStatus.NOT_FOUND);
        }
    }
}