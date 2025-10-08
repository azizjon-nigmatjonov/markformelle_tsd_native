import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { crossPlatformStorage } from "@/utils/storage";

interface AuthState {
  user_info: any;
  setUserInfo: (payload: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user_info: {},
      setUserInfo: (payload) => set({ user_info: payload }),
    }),
    {
      name: "app-state-auth", // Name of the storage key
      storage: createJSONStorage(() => crossPlatformStorage),
    }
  )
);
