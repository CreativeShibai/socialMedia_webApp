import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base URL and CORS credentials
export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to request header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check if the backend server is running.');
      return Promise.reject(new Error('Network error'));
    }
    
    // Handle authentication errors
    if (error.response.status === 401) {
      // If token is invalid or expired, clear local storage and redirect to login
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        window.location.href = '/login';
      }
    }
    
    // Handle forbidden errors
    if (error.response.status === 403) {
      toast.error('You do not have permission to perform this action');
    }
    
    // Handle server errors
    if (error.response.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);