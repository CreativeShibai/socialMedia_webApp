package com.fusion.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "votes", uniqueConstraints = { @UniqueConstraint(columnNames = { "user_id", "post_id" }) }, indexes = {
        @Index(name = "idx_vote_user_id", columnList = "user_id"),
        @Index(name = "idx_vote_post_id", columnList = "post_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    // Value: 1 for upvote, -1 for downvote
    @Column(nullable = false)
    private int value;
}