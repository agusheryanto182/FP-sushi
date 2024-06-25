import axios from 'axios';
import router from '@/router';

const Api = axios.create({
    baseURL: 'http://server.sukisuhi.works',
});

Api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);


export default Api;
