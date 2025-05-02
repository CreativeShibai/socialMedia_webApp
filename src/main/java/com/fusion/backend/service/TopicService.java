package com.fusion.backend.service;

import com.fusion.backend.entity.Topic;
import com.fusion.backend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    public Optional<Topic> getTopicById(UUID id) {
        return topicRepository.findById(id);
    }
}