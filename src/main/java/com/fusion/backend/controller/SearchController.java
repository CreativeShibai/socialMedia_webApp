package com.fusion.backend.controller;

import java.util.UUID;
import com.fusion.backend.entity.Post;
import com.fusion.backend.service.SearchService;
import com.fusion.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping
    public ResponseEntity<Page<Post>> searchPosts(@RequestParam String keyword, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<Post> posts = searchService.searchPosts(keyword, page, size);
        return ResponseEntity.ok(posts);
    }
}