/**
 * Authentication Service
 * All auth-related API calls
 */

import { api } from "../client";
import { AxiosResponse } from "axios";

// Types
export interface LoginCredentials {
  login: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    login: string;
    role: string;
    [key: string]: any;
  };
}

export interface UserInfo {
  id: number;
  name: string;
  login: string;
  token: string;
  role: string;
  [key: string]: any;
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
      "/login",
      credentials
    );
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with local logout even if API call fails
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<UserInfo> => {
    const response: AxiosResponse<UserInfo> = await api.get("/profile");
    return response.data;
  },

  /**
   * Refresh auth token
   */
  refreshToken: async (): Promise<{ token: string }> => {
    const response: AxiosResponse<{ token: string }> = await api.post(
      "/refresh-token"
    );
    return response.data;
  },

  /**
   * Verify token validity
   */
  verifyToken: async (): Promise<boolean> => {
    try {
      await api.get("/verify-token");
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default authService;
