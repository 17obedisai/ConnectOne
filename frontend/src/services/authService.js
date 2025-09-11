    import API from '../config/api';

    export const authService = {
    async register(userData) {
        const response = await API.post('/auth/register', userData);
        if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
        }
        return response.data;
    },

    async login(email, password) {
        const response = await API.post('/auth/login', { email, password });
        if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
    };