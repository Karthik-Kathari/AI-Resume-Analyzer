import api from './axios';

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
};

export const analysisAPI = {
  analyze: (formData) =>
    api.post('/analysis/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getHistory: () => api.get('/analysis/history'),
  getOne: (id) => api.get(`/analysis/${id}`),
  deleteOne: (id) => api.delete(`/analysis/${id}`),
};
