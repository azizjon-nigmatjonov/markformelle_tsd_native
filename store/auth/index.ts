import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      name: "app-state-auth", // Name of the AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
