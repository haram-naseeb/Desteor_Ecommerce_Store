/**
 * config/api.js
 *
 * The single, centrally configured Axios instance for the entire app.
 * No component or hook should ever call axios.get/post directly with a
 * hardcoded URL — everything imports `api` from here.
 *
 * Extensibility: future feature-specific request modules (e.g.
 * services/productService.js, services/authService.js in later sprints)
 * should wrap this instance rather than each page building its own
 * request logic. This keeps base URL, headers, and error handling
 * consistent across every API call the app ever makes.
 */

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor — reserved hook point for attaching an auth token
// once authentication exists (Sprint 2). No token logic yet.
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — normalizes errors into a consistent shape that
// matches the backend's { success, message } error format, so calling
// code can handle failures uniformly regardless of the endpoint.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = {
      success: false,
      message:
        error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status ?? null,
    };
    return Promise.reject(normalizedError);
  }
);

export default api;
