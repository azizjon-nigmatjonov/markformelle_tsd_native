import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  page: string;
  before: string;
  pageData: any;
  setPage: (payload: string) => void;
  setPageData: (payload: any) => void;
};

export const useMobileStore = create<Props>()(
  persist(
    (set, get) => ({
      page: "login",
      before: "",
      pageData: {},
      setPage: (payload: any) => {
        const currentPage = get().page; // Get the current page value
        set({ before: currentPage, page: payload });
      },
      setPageData: (payload: any) => {
        set({ pageData: payload });
      },
    }),
    {
      name: "app-state-mobile", // unique name for the storage
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for React Native
    }
  )
);
