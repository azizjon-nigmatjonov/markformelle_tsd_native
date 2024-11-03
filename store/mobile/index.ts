import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  page: string;
  setPage: (payload: any) => void;
};

export const useMobileStore = create<Props>()(
  persist(
    (set) => ({
      page: "login",
      setPage: (payload: any) => set({ page: payload }),
    }),
    {
      name: "app-state-mobile", // unique name for the storage
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for React Native
    }
  )
);
