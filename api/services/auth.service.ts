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
    const response: AxiosResponse<LoginResponse> = await api.post(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with local logout even if API call fails
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<UserInfo> => {
    const response: AxiosResponse<UserInfo> = await api.get("/auth/profile");
    return response.data;
  },

  /**
   * Refresh auth token
   */
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await api.post(
      "/auth/refresh",
      { refresh_token: refreshToken }
    );
    return response.data;
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
