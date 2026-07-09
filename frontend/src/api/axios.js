import axios from 'axios';

// Dynamically handle the backend API URL between local development and production
const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://jiit-review.onrender.com/api'
    : 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
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

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    // Only auto-logout if token is invalid on protected routes
    if (status === 401 && url !== "/auth/login") {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default api;