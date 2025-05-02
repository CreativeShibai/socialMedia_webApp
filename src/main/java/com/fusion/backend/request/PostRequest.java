package com.fusion.backend.request;

import java.util.UUID;

public class PostRequest {
    private String content;
    private String type;
    private int comments_count;
    private String image_url;
    private int likes_count;
    private int vote_score;
    private UUID parent_id;
    private UUID topic_id;


    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getComments_count() {
        return comments_count;
    }

    public void setComments_count(int comments_count) {
        this.comments_count = comments_count;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public int getLikes_count() {
        return likes_count;
    }

    public void setLikes_count(int likes_count) {
        this.likes_count = likes_count;
    }

    public int getVote_score() {
        return vote_score;
    }

    public void setVote_score(int vote_score) {
        this.vote_score = vote_score;
    }

    public UUID getTopic_id() { return topic_id; }
    public void setTopic_id(UUID topic_id) { this.topic_id = topic_id; }
    public UUID getParent_id() { return parent_id; }
    public void setParent_id(UUID parent_id) { this.parent_id = parent_id; }
}