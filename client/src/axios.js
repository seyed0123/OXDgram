import axios from 'axios';

// Create an instance of Axios
const instance = axios.create({
    baseURL: 'http://localhost:8000' // Replace with your backend API base URL
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // If the token exists, set the Authorization header
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
