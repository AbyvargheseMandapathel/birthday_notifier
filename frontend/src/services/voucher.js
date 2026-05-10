import api from '@/lib/api';

export const voucherService = {
  getAll: async () => {
    const response = await api.get('/api/vouchers/');
    return response.data;
  }
};
