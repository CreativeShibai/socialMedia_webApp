package com.fusion.backend.controller;

import com.fusion.backend.entity.QuestionThread;
import com.fusion.backend.service.QuestionThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/thread")
public class QuestionThreadController {

    @Autowired
    private QuestionThreadService questionThreadService;

    @PreAuthorize("permitAll()")
    @GetMapping("/{threadId}") 
    public ResponseEntity<QuestionThread> getQuestionThreadById(@PathVariable UUID threadId) {
        QuestionThread thread = questionThreadService.getQuestionThreadById(threadId);
        if (thread == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(thread);
    }
}