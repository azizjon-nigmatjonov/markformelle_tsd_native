import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { crossPlatformStorage } from "@/utils/storage";

type Props = {
  docs: any;
  setDocs: (payload: any) => void;
};

export const useDocsStore = create<Props>()(
  persist(
    (set) => ({
      docs: [],
      setDocs: (payload: any) => set({ docs: payload }),
    }),
    {
      name: "app-state-docs", // unique name for the storage
      storage: createJSONStorage(() => crossPlatformStorage),
    }
  )
);
