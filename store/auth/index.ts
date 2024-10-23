import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Install: npm install @react-native-async-storage/async-storage

// Define the type of the state
interface AuthState {
  user_info: Record<string, any>; // Adjust this type based on the actual user_info structure
  setUserInfo: (payload: Record<string, any>) => void;
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
