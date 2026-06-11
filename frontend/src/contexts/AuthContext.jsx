import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

// Extrae mensaje + errores por campo (Zod) de una respuesta de error de la API.
const parseApiError = (error, fallback) => {
  const data = error.response?.data;
  const fieldErrors = {};

  if (data && Array.isArray(data.errors)) {
    data.errors.forEach((issue) => {
      if (issue.field) fieldErrors[issue.field] = issue.message;
    });
  }

  return {
    message: data?.message || fallback,
    fieldErrors
  };
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Limpia toda la sesión local.
  const clearSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Verificar autenticación al montar: si hay token, se valida contra /me.
  useEffect(() => {
    checkAuth();

    // El interceptor de api.js emite este evento ante un 401.
    const handleUnauthorized = () => {
      clearSession();
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  // Hidrata el estado del usuario validando el token silenciosamente contra el backend.
  const checkAuth = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/auth/me');
      const currentUser = response.data?.data?.user;

      if (response.data?.success && currentUser) {
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        clearSession();
      }
    } catch (err) {
      // Token inválido/expirado: el interceptor ya limpió; aseguramos el estado.
      clearSession();
    } finally {
      setLoading(false);
    }
  };

  // Login contra el backend real.
  const login = async (credentials) => {
    setError(null);
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, data } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      return {
        success: true,
        user: data.user,
        hasCompletedQuestionnaire: data.user?.questionnaire_completed || false
      };
    } catch (err) {
      const { message, fieldErrors } = parseApiError(err, 'Error al iniciar sesión');
      setError(message);
      return { success: false, error: message, fieldErrors };
    }
  };

  // Registro contra el backend real.
  const register = async (userData) => {
    setError(null);
    try {
      const response = await api.post('/auth/register', userData);
      const { token, data } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      return { success: true, user: data.user, isNewUser: true };
    } catch (err) {
      const { message, fieldErrors } = parseApiError(err, 'Error al registrarse');
      setError(message);
      return { success: false, error: message, fieldErrors };
    }
  };

  // Logout: limpia sesión local (el header lo gestiona el interceptor).
  const logout = () => {
    clearSession();
    setError(null);
  };

  // Actualiza el estado del cuestionario en el usuario local.
  const updateQuestionnaireStatus = (completed) => {
    if (user) {
      const updatedUser = { ...user, questionnaire_completed: completed };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Actualiza datos del usuario local.
  const updateUser = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateQuestionnaireStatus,
    updateUser,
    setUser,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Exportación por defecto del Provider
export default AuthProvider;
