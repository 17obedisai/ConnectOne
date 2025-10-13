import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // URL de la API
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Verificar autenticación al cargar la app
  useEffect(() => {
    checkAuth();
  }, []);

  // Función para verificar si el usuario está autenticado
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        const userData = JSON.parse(userStr);
        
        // Verificar el token con el backend
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          // Token inválido, limpiar
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      // Si el token es inválido, limpiar
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Función de login
  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        const { token, data } = response.data;
        
        // Guardar token y usuario
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Configurar axios para futuras peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Actualizar estado
        setUser(data.user);
        
        return {
          success: true,
          user: data.user,
          hasCompletedQuestionnaire: data.user?.questionnaire_completed || false
        };
      } else {
        return {
          success: false,
          error: response.data.mensaje || 'Error al iniciar sesión'
        };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.response?.data?.mensaje || 'Error de conexión con el servidor'
      };
    }
  };

  // Función de registro
  const register = async (userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        const { token, data } = response.data;
        
        // Guardar token y usuario
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Configurar axios para futuras peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Actualizar estado
        setUser(data.user);
        
        return {
          success: true,
          user: data.user,
          isNewUser: true // Siempre es nuevo usuario en registro
        };
      } else {
        return {
          success: false,
          error: response.data.mensaje || 'Error al registrarse'
        };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        error: error.response?.data?.mensaje || 'Error de conexión con el servidor'
      };
    }
  };

  // Función de logout
  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Limpiar header de axios
    delete axios.defaults.headers.common['Authorization'];
    
    // Actualizar estado
    setUser(null);
  };

  // Función para actualizar el estado del cuestionario
  const updateQuestionnaireStatus = (completed) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        questionnaire_completed: completed 
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Función para actualizar datos del usuario
  const updateUser = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Valor del contexto
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateQuestionnaireStatus,
    updateUser,
    setUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportación por defecto del Provider
export default AuthProvider;