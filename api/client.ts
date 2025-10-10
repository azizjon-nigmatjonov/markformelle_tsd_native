/**
 * API Client
 * Centralized axios instance with interceptors
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { ENV } from "@/config/api";
import { useAuthStore } from "@/store/auth";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    try {
      const { tokens } = useAuthStore.getState();

      // Add token to headers if available
      if (tokens?.access_token) {
        config.headers.Authorization = `Bearer ${tokens.access_token}`;
      }

      return config;
    } catch (error) {
      console.error("❌ Request Interceptor Error:", error);
      return config; // Continue with request even if token retrieval fails
    }
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    try {
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;

        // Only log detailed errors in development
        const isDev = typeof __DEV__ !== "undefined" && __DEV__;
        if (isDev) {
          console.error("❌ API Error:", {
            status,
            url: error.config?.url,
            data: error.response.data,
          });
        }

        // Handle specific status codes
        switch (status) {
          case 401:
            // Unauthorized - invalid or expired token
            // Clear auth state (user will be redirected to login by auth guard in _layout.tsx)
            console.warn(
              "⚠️ Unauthorized: Token invalid or expired. Logging out..."
            );
            try {
              // Don't clear auth on login endpoint (avoid clearing during login attempt)
              if (!error.config?.url?.includes("/auth/login")) {
                useAuthStore.getState().clearAuth();
              }
            } catch (authError) {
              console.error("Error clearing auth:", authError);
            }
            break;
          case 403:
            console.error("Access forbidden");
            break;
          case 404:
            console.error("Resource not found");
            break;
          case 500:
            console.error("Server error");
            break;
        }
      } else if (error.request) {
        // Request made but no response
        console.error("❌ Network Error:", error.message);
      } else {
        // Error in request setup
        console.error("❌ Request Setup Error:", error.message);
      }
    } catch (handlerError) {
      console.error("❌ Error in response interceptor:", handlerError);
    }

    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  /**
   * GET request
   */
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, config);
  },

  /**
   * POST request
   */
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data, config);
  },

  /**
   * PUT request
   */
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data, config);
  },

  /**
   * PATCH request
   */
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.patch<T>(url, data, config);
  },

  /**
   * DELETE request
   */
  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url, config);
  },
};

export default apiClient;
