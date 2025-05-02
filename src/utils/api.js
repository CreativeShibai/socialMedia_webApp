import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base URL and authorization headers
export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Add a response interceptor
api.interceptors.response.use((response) => response, (error) => {
  if (!error.response) {
    toast.error('Network error. Please check if the backend server is running.');
    return Promise.reject(new Error('Network error'));
  }

  if (error.response.status === 401) {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
  }

  if (error.response.status === 403) {
    toast.error('You do not have permission to perform this action');
  }

  if (error.response.status >= 500) {
    toast.error('Server error. Please try again later.');
  }

  return Promise.reject(error);
});

// Auth
export const login = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (registerData) => {
  try {
    const response = await api.post('/auth/register', registerData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// User
export const getUserProfile = async (username) => {
  try {
    const response = await api.get(`/profile/${username}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Posts
export const getAllPosts = async (page = 0, size = 10) => {
  try {
    const response = await api.get(`/posts?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getPostsByType = async (type, page = 0, size = 10) => {
  try {
    const response = await api.get(`/posts?type=${type}&page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Likes
export const likePost = async (postId) => {
  try {
    const response = await api.post(`/post/${postId}/like`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Votes
export const votePost = async (postId, value) => {
  try {
    const response = await api.post(`/post/${postId}/vote`, { value });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Comments
export const commentPost = async (postId, commentData) => {
  try {
    const response = await api.post(`/posts/${postId}/comment`, commentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Topics
export const getTopicById = async (topicId) => {
  try {
    const response = await api.get(`/topic/${topicId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Search
export const searchPosts = async (keyword) => {
  try {
    const response = await api.get(`/search?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};