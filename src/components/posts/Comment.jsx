import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Comment = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentChange = (event) => {
    setNewCommentContent(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error('You must be logged in to post a comment.');
      return;
    }

    if (newCommentContent.trim() === '') {
      toast.error('Comment cannot be empty.');
      return;
    }

    try {
      const response = await api.post(`/posts/${postId}/comment`, {
        content: newCommentContent,
      });

      setComments([...comments, response.data]);
      setNewCommentContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to post comment.');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      <form onSubmit={handleSubmitComment} className="mb-4">
        <textarea
          value={newCommentContent}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Post Comment
        </button>
      </form>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="border border-gray-300 rounded-md p-2">
            <p className="font-medium">{comment.user?.displayName || 'Anonymous'}</p>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;