


import axios from 'axios';
import ROUTES from '../routers/dashboard/path';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
    headers: {'Content-Type': 'application/json',},
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_access_token');
        if (token) {config.headers.Authorization = `Bearer ${token}`;}
        return config;
    },

    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
      if (error.response?.status === 401) {
          localStorage.removeItem('admin_access_token');
          localStorage.removeItem('admin_refresh_token');
          localStorage.removeItem('admin_user');
          window.location.href = ROUTES.LOGIN
      }
      return Promise.reject(error);
    }
);

export default api;

