import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { crossPlatformStorage } from "@/utils/storage";

type ListStore = {
  type: string;
  setType: (payload: string) => void;
};

export const useListStore = create<ListStore>()(
  persist(
    (set) => ({
      type: "list",
      setType: (payload: any) => set({ type: payload }),
    }),
    {
      name: "app-state-list", // Unique name for the storage
      storage: createJSONStorage(() => crossPlatformStorage),
    }
  )
);
