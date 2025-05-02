package com.fusion.backend.service;

import com.fusion.backend.entity.QuestionThread;

import java.util.UUID;
import com.fusion.backend.exception.NotFoundException;
import com.fusion.backend.repository.QuestionThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class QuestionThreadService {

    @Autowired
    private QuestionThreadRepository questionThreadRepository;
    
    /**
     * Retrieves a question thread by its ID.
     *
     * @param id The ID of the question thread to retrieve.
     * @return The question thread if found.
     * @throws NotFoundException If the question thread with the given ID does not exist.
     */
    public QuestionThread getQuestionThreadById(UUID id) {
        return questionThreadRepository.findById(id).orElseThrow(() -> new NotFoundException("QuestionThread not found"));
    }

}