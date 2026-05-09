import axios from 'axios';

// During build/SSR, we use the internal Docker name 'backend'
// In the browser, we use the NEXT_PUBLIC_API_URL from .env (which should be localhost)
const isServer = typeof window === 'undefined';
const API_URL = isServer 
  ? (process.env.INTERNAL_API_URL || 'http://backend:8000') 
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}/api/auth/refresh/`, {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
