// src/lib/axios.ts
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

if (!API_BASE_URL) {
  console.error('VITE_API_BASE_URL belum dikonfigurasi di file .env');
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 detik timeout
});

// ==========================================
// 1. REQUEST INTERCEPTOR: Tempelkan Bearer Token
// ==========================================
apiClient.interceptors.request.use(
  (config) => {
    // Ambil token langsung dari Zustand store
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// 2. RESPONSE INTERCEPTOR: Handle Token Expired (401)
// ==========================================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika token tidak valid / sudah expired dari NestJS
    if (error.response?.status === 401) {
      // Otomatis logout dan bersihkan local storage
      useAuthStore.getState().logout();
      
      // Redirect ke login jika bukan di halaman login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
