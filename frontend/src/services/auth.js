import api from '@/lib/api';

export const authService = {
  // Login
  login: async (email, password) => {
    const res = await api.post('/api/auth/login/', { email, password });
    return res.data;
  },

  // Register
  register: async (username, email, password) => {
    const res = await api.post('/api/auth/register/', { username, email, password });
    return res.data;
  },

  // Request Password Reset
  forgotPassword: async (email) => {
    const res = await api.post('/api/auth/password_reset/', { email });
    return res.data;
  },

  // Reset Password with Token
  resetPassword: async (token, password) => {
    const res = await api.post('/api/auth/password_reset/confirm/', { token, password });
    return res.data;
  },

  // Get current user profile
  getProfile: async () => {
    const res = await api.get('/api/auth/user/');
    return res.data;
  }
};
