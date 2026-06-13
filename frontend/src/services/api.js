import axios from 'axios';

// Cliente HTTP central. baseURL viene ESTRICTAMENTE de VITE_API_URL:
//   - .env.development -> http://localhost:5000/api (local)
//   - .env.production  -> https://<backend>.onrender.com/api (Render)
// Sin fallback "quemado": así un build de producción nunca apunta a localhost.
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  // Aviso temprano en consola si el .env no definió la URL al compilar.
  console.error('[api] VITE_API_URL no está definida. Revisa tu archivo .env.');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ─────────────────────────────────────────────────────────────
// Request interceptor: inyecta Authorization: Bearer <token>
// tomado de localStorage en cada petición saliente.
// ─────────────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────────────────────────
// Response interceptor: ante un 401 (sesión expirada/ inválida),
// limpia la sesión y notifica a la app vía evento global.
// AuthContext escucha 'auth:unauthorized' para resetear el estado.
// ─────────────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
