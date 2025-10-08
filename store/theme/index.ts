import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { crossPlatformStorage } from "@/utils/storage";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const currentTheme = get().theme;
        set({ theme: currentTheme === "light" ? "dark" : "light" });
      },
    }),
    {
      name: "app-state-theme",
      storage: createJSONStorage(() => crossPlatformStorage),
    }
  )
);
