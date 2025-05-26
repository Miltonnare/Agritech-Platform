import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(transformError(error));
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Transform successful response if needed
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await api.post<{ token: string }>('/auth/refresh', { refreshToken });
        const { token } = response.data;
        
        localStorage.setItem('auth_token', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect to login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/auth';
        return Promise.reject(transformError(refreshError as AxiosError));
      }
    }

    return Promise.reject(transformError(error));
  }
);

// Transform error to a consistent format
function transformError(error: AxiosError): ApiError {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const data = error.response.data as any;
    return {
      message: data.message || 'An error occurred',
      code: data.code || `ERR_${error.response.status}`,
      details: data.details,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'No response received from server',
      code: 'ERR_NO_RESPONSE',
      details: {
        request: error.request,
      },
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'ERR_REQUEST_SETUP',
      details: {
        config: error.config,
      },
    };
  }
}

export default api; 