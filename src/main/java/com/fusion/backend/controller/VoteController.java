package com.fusion.backend.controller;

import com.fusion.backend.entity.Vote;
import com.fusion.backend.request.VoteRequest;
import com.fusion.backend.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/post")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/{postId}/vote")
    public ResponseEntity<Vote> createVote(@PathVariable UUID postId, @RequestBody VoteRequest voteRequest) {
        Vote vote = voteService.createVote(postId, voteRequest);
        return new ResponseEntity<>(vote, HttpStatus.CREATED);
    }
}