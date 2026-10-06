import axios from 'axios';
import {
  FALLBACK_SERVICES,
  FALLBACK_PRODUCTS,
  FALLBACK_PROJECTS,
  FALLBACK_STATS,
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to inject Authorization header
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

// Response interceptor for consistent error extraction and HTML rejection
api.interceptors.response.use(
  (response) => {
    // If the server returns HTML (e.g. Vercel SPA rewrite fallback for /api routes)
    if (
      typeof response.data === 'string' &&
      (response.data.trim().startsWith('<!doctype') ||
        response.data.trim().startsWith('<html') ||
        response.data.trim().startsWith('<!DOCTYPE'))
    ) {
      return Promise.reject(
        new Error('API returned HTML instead of JSON. Backend service endpoint is offline.')
      );
    }
    return response;
  },
  (error) => {
    let message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.';

    if (error.response?.status === 502) {
      message =
        'Backend server is offline or unreachable. Please ensure the backend is running on port 5001 (npm run dev:backend).';
    }

    // Automatically clear token on 401 if unauthorized
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    return Promise.reject(new Error(message));
  }
);

// Exported modular API endpoints with seamless fallback resilience
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const productsAPI = {
  getAll: async (params) => {
    try {
      const res = await api.get('/products', { params });
      if (Array.isArray(res.data) && res.data.length > 0) return res;
      let list = [...FALLBACK_PRODUCTS];
      if (params?.category && params.category !== 'All') {
        list = list.filter((p) => p.category === params.category);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q)
        );
      }
      return { data: list };
    } catch {
      let list = [...FALLBACK_PRODUCTS];
      if (params?.category && params.category !== 'All') {
        list = list.filter((p) => p.category === params.category);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q)
        );
      }
      return { data: list };
    }
  },
  getByIdOrSlug: async (idOrSlug) => {
    try {
      const res = await api.get(`/products/${idOrSlug}`);
      if (
        res.data &&
        (res.data._id || res.data.slug) &&
        typeof res.data === 'object' &&
        !Array.isArray(res.data)
      ) {
        return res;
      }
      const found = FALLBACK_PRODUCTS.find(
        (p) => p._id === idOrSlug || p.slug === idOrSlug || p.id === idOrSlug
      );
      return { data: found || FALLBACK_PRODUCTS[0] };
    } catch {
      const found = FALLBACK_PRODUCTS.find(
        (p) => p._id === idOrSlug || p.slug === idOrSlug || p.id === idOrSlug
      );
      return { data: found || FALLBACK_PRODUCTS[0] };
    }
  },
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const servicesAPI = {
  getAll: async () => {
    try {
      const res = await api.get('/services');
      if (Array.isArray(res.data) && res.data.length > 0) return res;
      return { data: FALLBACK_SERVICES };
    } catch {
      return { data: FALLBACK_SERVICES };
    }
  },
  getById: async (id) => {
    try {
      const res = await api.get(`/services/${id}`);
      if (
        res.data &&
        (res.data._id || res.data.id) &&
        typeof res.data === 'object' &&
        !Array.isArray(res.data)
      ) {
        return res;
      }
      const found = FALLBACK_SERVICES.find(
        (s) => s._id === id || s.id === id
      );
      return { data: found || FALLBACK_SERVICES[0] };
    } catch {
      const found = FALLBACK_SERVICES.find(
        (s) => s._id === id || s.id === id
      );
      return { data: found || FALLBACK_SERVICES[0] };
    }
  },
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

export const projectsAPI = {
  getAll: async (params) => {
    try {
      const res = await api.get('/projects', { params });
      if (Array.isArray(res.data) && res.data.length > 0) return res;
      let list = [...FALLBACK_PROJECTS];
      if (params?.category && params.category !== 'All') {
        list = list.filter((p) => p.category === params.category);
      }
      return { data: list };
    } catch {
      let list = [...FALLBACK_PROJECTS];
      if (params?.category && params.category !== 'All') {
        list = list.filter((p) => p.category === params.category);
      }
      return { data: list };
    }
  },
  getById: async (id) => {
    try {
      const res = await api.get(`/projects/${id}`);
      if (
        res.data &&
        (res.data._id || res.data.id) &&
        typeof res.data === 'object' &&
        !Array.isArray(res.data)
      ) {
        return res;
      }
      const found = FALLBACK_PROJECTS.find(
        (p) => p._id === id || p.id === id
      );
      return { data: found || FALLBACK_PROJECTS[0] };
    } catch {
      const found = FALLBACK_PROJECTS.find(
        (p) => p._id === id || p.id === id
      );
      return { data: found || FALLBACK_PROJECTS[0] };
    }
  },
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const contactAPI = {
  send: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  updateStatus: (id, status) => api.put(`/contact/${id}`, { status }),
  delete: (id) => api.delete(`/contact/${id}`),
};

export const usersAPI = {
  getAll: () => api.get('/users'),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
  delete: (id) => api.delete(`/users/${id}`),
};

export const statsAPI = {
  getStats: async () => {
    try {
      const res = await api.get('/stats');
      if (
        res.data &&
        typeof res.data === 'object' &&
        !Array.isArray(res.data) &&
        typeof res.data !== 'string'
      ) {
        return res;
      }
      return { data: FALLBACK_STATS };
    } catch {
      return { data: FALLBACK_STATS };
    }
  },
};

export default api;
