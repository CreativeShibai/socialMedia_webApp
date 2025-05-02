import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';
import Post from './Post';
import Comment from './Comment';
import toast from 'react-hot-toast';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${postId}`);
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Error fetching post.');
        setIsLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await api.get(`/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast.error('Error fetching comments.');
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        toast.error("You need to be logged in to comment");
        return;
      }
    try {
      const response = await api.post(`/posts/${postId}/comment`, { content: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
      toast.success("Comment added");
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Error submitting comment.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Post post={post} />
        <h2 className="text-2xl font-semibold mt-6">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
            Submit Comment
          </button>
        </form>
        {comments.length > 0 ? (
          <div className="mt-4">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="mt-4">No comments yet.</p>
        )}
    </div>
  );
};

export default PostPage;