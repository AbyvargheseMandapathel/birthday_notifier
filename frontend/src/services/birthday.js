import api from '@/lib/api';

export const birthdayService = {
  // Get all birthdays
  getAll: async () => {
    const res = await api.get('/api/birthdays/');
    return res.data.results || res.data;
  },

  // Get upcoming birthdays (next 30 days)
  getUpcoming: async () => {
    const res = await api.get('/api/birthdays/upcoming/');
    return res.data;
  },

  // Add a new birthday
  add: async (data) => {
    const res = await api.post('/api/birthdays/', data);
    return res.data;
  },

  // Update an existing birthday
  update: async (id, data) => {
    const res = await api.patch(`/api/birthdays/${id}/`, data);
    return res.data;
  },

  // Delete a birthday
  delete: async (id) => {
    await api.delete(`/api/birthdays/${id}/`);
  }
};
