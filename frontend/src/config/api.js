    import axios from 'axios';

    const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
    });

    // Interceptor para agregar token
    API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
        config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

    // Interceptor para manejar errores
    API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
    );

    export default API;