import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ACCESS_TOKEN_KEY = 'desteor_access_token';
const REFRESH_TOKEN_KEY = 'desteor_refresh_token';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export function getStoredAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function storeTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

api.interceptors.request.use(
  (config) => {
    const token = getStoredAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = {
      success: false,
      message:
        error.response?.data?.message || error.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors || null,
      status: error.response?.status ?? null,
    };

    if (normalizedError.status === 401) {
      window.dispatchEvent(new Event('desteor:unauthorized'));
    }

    return Promise.reject(normalizedError);
  }
);

export default api;
