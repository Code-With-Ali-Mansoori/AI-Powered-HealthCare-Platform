import axios from 'axios';

// Base API instance pointing to the Express backend
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ai-powered-healthcare-platform-xv73.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token if it exists in localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
