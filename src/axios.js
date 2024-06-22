import axios from 'axios';
import router from '@/router';

const Api = axios.create({
    baseURL: 'http://localhost:9000',
});

// Add a request interceptor to include the token
Api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration
Api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { status } = error.response;
        if (status === 401) { // Unauthorized
            localStorage.removeItem('token'); // Remove the expired token
            router.push('/login'); // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default Api;
