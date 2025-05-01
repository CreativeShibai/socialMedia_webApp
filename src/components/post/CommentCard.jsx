import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  Reply,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/api";
import toast from "react-hot-toast";
import Button from "../ui/Button";

const CommentCard = ({ comment, onReply, onUpdate }) => {
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likesCount, setLikesCount] = useState(comment.likesCount);
  const [showReplies, setShowReplies] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to like comments");
      return;
    }

    try {
      const newLikeStatus = !isLiked;
      const endpoint = `/api/comments/${comment.id}/like`;
      const method = newLikeStatus ? "post" : "delete";

      await api[method](endpoint);

      setIsLiked(newLikeStatus);
      setLikesCount((prev) => (newLikeStatus ? prev + 1 : prev - 1));

      if (onUpdate) {
        onUpdate({
          ...comment,
          isLiked: newLikeStatus,
          likesCount: newLikeStatus
            ? comment.likesCount + 1
            : comment.likesCount - 1,
        });
      }
    } catch (error) {
      toast.error("Failed to update like status");
    }
  };

  const handleShowReplies = () => {
    if (comment.repliesCount > 0 && !showReplies) {
      // Fetch replies if not already loaded
      if (!comment.replies || comment.replies.length === 0) {
        fetchReplies();
      } else {
        setShowReplies(!showReplies);
      }
    } else {
      setShowReplies(!showReplies);
    }
  };

  const fetchReplies = async () => {
    try {
      const response = await api.get(`/api/comments/${comment.id}/replies`);
      if (onUpdate) {
        onUpdate({
          ...comment,
          replies: response.data,
        });
      }
      setShowReplies(true);
    } catch (error) {
      toast.error("Failed to load replies");
    }
  };

  const handleReply = () => {
    if (onReply) {
      onReply(comment.id);
    }
  };

  const renderIndentation = () => {
    if (comment.depth === 0) return null;

    return (
      <div
        className="absolute left-0 top-0 bottom-0 border-l-2 border-gray-200 dark:border-gray-700"
        style={{ marginLeft: `${(comment.depth - 1) * 24 + 12}px` }}
      />
    );
  };

  return (
    <div
      className={`relative ${
        comment.depth > 0 ? `pl-${comment.depth * 6}` : ""
      }`}
    >
      {renderIndentation()}

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-2 border border-gray-200 dark:border-gray-700">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {comment.author.avatarUrl ? (
              <img
                src={comment.author.avatarUrl}
                alt={comment.author.displayName}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                {comment.author.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="ml-2">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {comment.author.displayName}
                </span>
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  @{comment.author.username}
                </span>
              </div>
              <time
                className="text-xs text-gray-500 dark:text-gray-400"
                dateTime={comment.createdAt}
              >
                {formatDate(comment.createdAt)}
              </time>
            </div>
          </div>

          <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Comment Content */}
        <div className="text-sm text-gray-800 dark:text-gray-200 mb-3">
          {comment.content}
        </div>

        {/* Comment Actions */}
        <div className="flex items-center text-xs">
          <button
            onClick={handleLike}
            className={`flex items-center mr-4 ${
              isLiked
                ? "text-red-500 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400"
                : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <Heart size={14} className={isLiked ? "fill-current" : ""} />
            <span className="ml-1">{likesCount}</span>
          </button>

          <button
            onClick={handleReply}
            className="flex items-center mr-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Reply size={14} />
            <span className="ml-1">Reply</span>
          </button>

          {comment.repliesCount > 0 && (
            <button
              onClick={handleShowReplies}
              className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>
                {showReplies
                  ? "Hide replies"
                  : `Show ${comment.repliesCount} ${
                      comment.repliesCount === 1 ? "reply" : "replies"
                    }`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Replies */}
      {showReplies && comment.replies && (
        <div className="pl-4 mt-1 border-l-2 border-gray-200 dark:border-gray-700">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
