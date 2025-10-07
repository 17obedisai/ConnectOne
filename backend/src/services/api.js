    import axios from 'axios';

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
    });

    export const usuariosAPI = {
    obtenerTodos: async () => {
        try {
        const response = await api.get('/usuarios');
        return response.data;
        } catch (error) {
        throw error.response?.data || error;
        }
    },
    
    obtenerPorId: async (id) => {
        try {
        const response = await api.get(`/usuarios/${id}`);
        return response.data;
        } catch (error) {
        throw error.response?.data || error;
        }
    },
    
    crear: async (datos) => {
        try {
        const response = await api.post('/usuarios', datos);
        return response.data;
        } catch (error) {
        throw error.response?.data || error;
        }
    },
    
    actualizar: async (id, datos) => {
        try {
        const response = await api.put(`/usuarios/${id}`, datos);
        return response.data;
        } catch (error) {
        throw error.response?.data || error;
        }
    },
    
    eliminar: async (id) => {
        try {
        const response = await api.delete(`/usuarios/${id}`);
        return response.data;
        } catch (error) {
        throw error.response?.data || error;
        }
    }
    };

    export default api;