import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:4000/api', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the access token in headers
api.interceptors.request.use(
    (config) => {
        // Get the access token from localStorage
        const token = localStorage.getItem('access_token');
        if (token) {
            // Set the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
