import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { crossPlatformStorage } from "@/utils/storage";

// Types
export interface UserInfo {
  id: number;
  name: string;
  login: string;
  token: string;
  role: string;
  [key: string]: any;
}

interface AuthState {
  user_info: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUserInfo: (payload: UserInfo) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user_info: null,
      isAuthenticated: false,
      isLoading: false,

      // Set user info and mark as authenticated
      setUserInfo: (payload: UserInfo) =>
        set({
          user_info: payload,
          isAuthenticated: true,
          isLoading: false,
        }),

      // Clear authentication
      clearAuth: () =>
        set({
          user_info: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      // Set loading state
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "app-state-auth", // Name of the storage key
      storage: createJSONStorage(() => crossPlatformStorage),
      // Only persist user_info and isAuthenticated
      partialize: (state) => ({
        user_info: state.user_info,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
