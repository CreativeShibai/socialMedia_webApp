package com.fusion.backend.repository;

import com.fusion.backend.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByUserIdAndPostId(Long userId, Long postId);

    boolean existsByUserIdAndPostId(Long userId, Long postId);

    // Calculate the total vote score for a post
    @Query("SELECT COALESCE(SUM(v.value), 0) FROM Vote v WHERE v.post.id = :postId")
    int calculateVoteScoreByPostId(Long postId);

    void deleteByUserIdAndPostId(Long userId, Long postId);
}