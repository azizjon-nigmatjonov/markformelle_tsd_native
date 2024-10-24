import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for React Native
    }
  )
);
