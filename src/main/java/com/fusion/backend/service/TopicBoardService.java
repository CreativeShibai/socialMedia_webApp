package com.fusion.backend.service;

import com.fusion.backend.entity.TopicBoard;
import com.fusion.backend.repository.TopicBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;
import java.util.UUID;


@Service
public class TopicBoardService {

    @Autowired
    private TopicBoardRepository topicBoardRepository;

    public TopicBoard getTopicBoardById(UUID id)  {
        return topicBoardRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Topic board not found")
        );
    }
}