package com.fusion.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "posts", indexes = {
        @Index(name = "idx_post_author_id", columnList = "author_id"),
        @Index(name = "idx_post_topic_id", columnList = "topic_id"),
        @Index(name = "idx_post_type", columnList = "type")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PostType type;

    @Column(nullable = false, length = 2000) // Max length based on frontend observation
    private String content;

    @Column(length = 255)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id") // Nullable for posts not in a topic (e.g., TWEET)
    private Topic topic;

    // For threaded posts (Questions/Answers)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Post parent; // Link to parent post (e.g., Answer links to Question)

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Post> replies = new HashSet<>();

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int likesCount = 0;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int commentsCount = 0; // Direct comments/replies to this post

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int voteScore = 0; // Used for BOARD_POST type

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Transient fields (not stored in DB) potentially needed for frontend
    // @Transient
    // private boolean isLiked;
    // @Transient
    // private int userVote;
}