import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { crossPlatformStorage } from "@/utils/storage";

// Types
export interface UserInfo {
  tabn: string;
  fio: string;
  podr_id: string;
  spec_id: string;
  item_id: string;
  permissions: string[];
  [key: string]: any;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface AuthState {
  user_info: UserInfo | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (userInfo: UserInfo, tokens: AuthTokens) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  updateTokens: (tokens: AuthTokens) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user_info: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,

      // Set user info and tokens, mark as authenticated
      setAuth: (userInfo: UserInfo, tokens: AuthTokens) =>
        set({
          user_info: userInfo,
          tokens: tokens,
          isAuthenticated: true,
          isLoading: false,
        }),

      // Clear authentication
      clearAuth: () =>
        set({
          user_info: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      // Set loading state
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      // Update tokens (for refresh)
      updateTokens: (tokens: AuthTokens) =>
        set({
          tokens: tokens,
        }),
    }),
    {
      name: "app-state-auth", // Name of the storage key
      storage: createJSONStorage(() => crossPlatformStorage),
      // Persist user_info, tokens, and isAuthenticated
      partialize: (state) => ({
        user_info: state.user_info,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
      // Handle rehydration errors gracefully
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Error rehydrating auth store:", error);
        }
      },
    }
  )
);
