import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { api } from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const CreatePostForm = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const postData = {
        content: data.content,
        type: data.type, // Ensure 'type' is sent, not 'postType'
      };
      const response = await api.post('/posts', postData);
      toast.success('Post created successfully!');
      reset();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            {...register('content', { required: true })}
            className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white"
            placeholder="Write your post here..."
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium">
            Post Type
          </label>
          <select
            id="type"
            {...register('type', { required: true })}
            className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white"
          >
            <option value="TWEET">Tweet</option>
            <option value="BOARD">Board</option>
            <option value="QUESTION">Question</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          disabled={loading}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;