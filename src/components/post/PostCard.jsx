import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/api";
import toast from "react-hot-toast";

const PostCard = ({ post, onPostUpdate }) => {
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showOptions, setShowOptions] = useState(false);
  const [voteScore, setVoteScore] = useState(post.voteScore || 0);
  const [userVote, setUserVote] = useState(post.userVote || 0);

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to like posts");
      return;
    }

    try {
      const newLikeStatus = !isLiked;
      const endpoint = `/aai/ppi/posts/${post.id}/like`;
      const method = newLikeStatus ? "post" : "delete";

      await api[method](endpoint);

      setIsLiked(newLikeStatus);
      setLikesCount((prev) => (newLikeStatus ? prev + 1 : prev - 1));

      if (onPostUpdate) {
        onPostUpdate({
          ...post,
          isLiked: newLikeStatus,
          likesCount: newLikeStatus ? post.likesCount + 1 : post.likesCount - 1,
        });
      }
    } catch (error) {
      toast.error("Failed to update like status");
    }
  };

  const handleVote = async (value) => {
    if (!isAuthenticated) {
      toast.error("Please log in to vote");
      return;
    }

    // If clicking the same vote again, remove the vote
    const newVoteValue = userVote === value ? 0 : value;

    try {
      (await api.po) /
        apist(`/api/posts/${post.id}/vote`, { value: newVoteValue });

      // Update the local state
      const voteChange = newVoteValue - userVote;
      setVoteScore((prev) => prev + voteChange);
      setUserVote(newVoteValue);

      if (onPostUpdate) {
        onPostUpdate({
          ...post,
          voteScore: voteScore + voteChange,
          userVote: newVoteValue,
        });
      }
    } catch (error) {
      toast.error("Failed to update vote");
    }
  };

  const handleShare = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard
      .writeText(postUrl)
      .then(() => toast.success("Link copied to clipboard"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const renderPostLink = () => {
    switch (post.type) {
      case "BOARD_POST":
        return `/board/${post.topic?.id}/post/${post.id}`;
      case "QUESTION":
      case "ANSWER":
        return `/thread/${post.id}`;
      default:
        return `/post/${post.id}`;
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-4 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <Link
            to={`/profile/${post.author.username}`}
            className="flex-shrink-0"
          >
            {post.author.avatarUrl ? (
              <img
                src={post.author.avatarUrl}
                alt={post.author.displayName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                {post.author.displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>
          <div className="ml-3">
            <Link
              to={`/profile/${post.author.username}`}
              className="text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {post.author.displayName}
            </Link>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Link
                to={`/profile/${post.author.username}`}
                className="hover:underline"
              >
                @{post.author.username}
              </Link>
              <span className="mx-1">•</span>
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>

              {post.topic && (
                <>
                  <span className="mx-1">•</span>
                  <Link
                    to={`/board/${post.topic.id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    #{post.topic.name}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
          >
            <MoreHorizontal size={18} />
          </button>

          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Save post for later functionality
                    toast.success("Post saved for later");
                    setShowOptions(false);
                  }}
                >
                  Save for later
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // Report post functionality
                    toast.success("Post reported");
                    setShowOptions(false);
                  }}
                >
                  Report post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <Link to={renderPostLink()} className="block p-4">
        <p className="text-gray-800 dark:text-gray-200">{post.content}</p>

        {post.imageUrl && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img
              src={post.imageUrl}
              alt="Post attachment"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}
      </Link>

      {/* Post Actions */}
      <div className="flex items-center px-4 py-3 border-t border-gray-100 dark:border-gray-700">
        {post.type === "BOARD_POST" ? (
          <div className="flex items-center mr-4">
            <button
              onClick={() => handleVote(1)}
              className={`p-1 ${
                userVote === 1
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              }`}
              aria-label="Upvote"
            >
              <ChevronUp size={20} />
            </button>
            <span className="mx-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {voteScore}
            </span>
            <button
              onClick={() => handleVote(-1)}
              className={`p-1 ${
                userVote === -1
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              }`}
              aria-label="Downvote"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLike}
            className={`flex items-center mr-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 ${
              isLiked
                ? "text-red-500 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400"
                : ""
            }`}
            aria-label="Like"
          >
            <Heart size={18} className={isLiked ? "fill-current" : ""} />
            <span className="ml-1 text-xs font-medium">{likesCount}</span>
          </button>
        )}

        <Link
          to={renderPostLink()}
          className="flex items-center mr-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="Comment"
        >
          <MessageSquare size={18} />
          <span className="ml-1 text-xs font-medium">{post.commentsCount}</span>
        </Link>

        <button
          onClick={handleShare}
          className="flex items-center mr-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="Share"
        >
          <Share2 size={18} />
        </button>

        <button
          className="flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="Bookmark"
        >
          <Bookmark size={18} />
        </button>
      </div>
    </article>
  );
};

export default PostCard;
