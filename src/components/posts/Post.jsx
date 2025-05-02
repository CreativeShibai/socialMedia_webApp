import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Post = ({ post, refreshPosts }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [voteValue, setVoteValue] = useState(0);

  useEffect(() => {
    const checkLikeAndVote = async () => {
      if (user && post.id) {
        try {
          const response = await api.get(`/post/${post.id}/likes`); // Assuming you have an endpoint to check if a user liked a post
          const likedByUser = response.data.some((like) => like.userId === user.id);
          setIsLiked(likedByUser);

          const voteResponse = await api.get(`/post/${post.id}/votes`);
          const userVote = voteResponse.data.find((vote) => vote.userId === user.id);
          setVoteValue(userVote ? userVote.value : 0);
        } catch (error) {
          console.error('Error checking like and vote status:', error);
        }
      }
    };

    checkLikeAndVote();
  }, [user, post.id]);

  const handleLike = async () => {
    if (!user) {
      toast.error('You must be logged in to like a post.');
      return;
    }

    try {
      if (isLiked) {
        await api.delete(`/post/${post.id}/like`); // Assuming you have an endpoint to unlike
        toast.success('Post unliked');
      } else {
        await api.post(`/post/${post.id}/like`); // Assuming you have an endpoint to like
        toast.success('Post liked');
      }
      setIsLiked(!isLiked);
      refreshPosts(); 
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      toast.error('Failed to like/unlike post.');
    }
  };

  const handleVote = async (value) => {
    if (!user) {
      toast.error('You must be logged in to vote.');
      return;
    }

    try {
      const voteData = { value };
      await api.post(`/post/${post.id}/vote`, voteData);
      setVoteValue(value);
      toast.success('Vote successful!');
      refreshPosts();
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Failed to vote.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <img
          src={post.author?.avatar_url || '/default-avatar.png'}
          alt={`${post.author?.display_name || 'Unknown'} avatar`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <Link to={`/profile/${post.author?.username}`} className="font-semibold">
            {post.author?.display_name || 'Unknown'}
          </Link>
          <p className="text-gray-500 text-sm">@{post.author?.username}</p>
        </div>
      </div>
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post Image"
          className="w-full h-auto rounded-lg mb-2"
        />
      )}
      <p className="mb-2">{post.content}</p>
      <div className="flex items-center text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center mr-4 ${isLiked ? 'text-red-500' : ''}`}
        >
          <svg
            className="h-5 w-5 fill-current mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.7 12 5C13.09 3.7 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z"
              fill={isLiked ? "red" : "currentColor"}
            />
          </svg>
          {post.likes_count} Likes
        </button>
        <div className="flex items-center mr-4">
        <button
          onClick={() => handleVote(1)}
          className={`flex items-center mr-4 ${voteValue === 1 ? 'text-blue-500' : ''}`}
        >
          <svg
            className="h-5 w-5 fill-current mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L20 16H4L12 4ZM12 0L0 18H24L12 0Z"
              fill={voteValue === 1 ? 'blue' : 'currentColor'}
            />
          </svg>
        </button>
        <button
          onClick={() => handleVote(-1)}
          className={`flex items-center mr-4 ${voteValue === -1 ? 'text-blue-500' : ''}`}
        >
          <svg
            className="h-5 w-5 fill-current mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 20L4 8H20L12 20ZM12 24L24 6H0L12 24Z"
              fill={voteValue === -1 ? 'blue' : 'currentColor'}
            />
          </svg>
        </button>
        {post.vote_score} Votes
        </div>
        <span className="mr-4">
          {post.comments_count} Comments
        </span>
      </div>
    </div>
  );
};

export default Post;