import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-type': 'application/json',
    },
});

const httpCall = (method, url, data) =>
    http({
        method,
        url,
        data,
    });

http.interceptors.request.use((config) => {
    const newConfig = config;
    const token = localStorage.getItem('token');
    if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
});

export { httpCall };
