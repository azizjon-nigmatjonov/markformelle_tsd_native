/**
 * Authentication Service
 * All auth-related API calls
 */

import { api } from "../client";
import { AxiosResponse } from "axios";

// Types
export interface LoginCredentials {
  qr_code: string;
}

export interface UserInfo {
  tabn: string;
  fio: string;
  podr_id: string;
  spec_id: string;
  item_id: string;
  permissions: string[];
  [key: string]: any;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user_info: UserInfo;
}

/**
 * Auth Service
 */
export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post(
        "/auth/login",
        credentials
      );
      return response.data;
    } catch (error: any) {
      console.error("Auth service - login error:", error);
      // Re-throw with enhanced error info
      if (error.response) {
        // Server responded with error
        throw {
          ...error,
          message:
            error.response.data?.message || error.message || "Ошибка входа",
        };
      } else if (error.request) {
        // Network error
        throw {
          ...error,
          message: "Нет соединения с сервером. Проверьте интернет.",
        };
      } else {
        // Other error
        throw error;
      }
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error: any) {
      console.error("Auth service - logout error:", error);
      // Continue with local logout even if API call fails
      // Don't throw - let the app handle logout locally
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<UserInfo> => {
    try {
      const response: AxiosResponse<UserInfo> = await api.get("/auth/profile");
      return response.data;
    } catch (error: any) {
      console.error("Auth service - get profile error:", error);
      throw error;
    }
  },

  /**
   * Refresh auth token
   */
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post(
        "/auth/refresh",
        { refresh_token: refreshToken }
      );
      return response.data;
    } catch (error: any) {
      console.error("Auth service - refresh token error:", error);
      throw error;
    }
  },

  /**
   * Verify token validity
   */
  verifyToken: async (): Promise<boolean> => {
    try {
      await api.get("/auth/verify");
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default authService;
