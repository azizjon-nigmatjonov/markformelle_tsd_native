import { create } from "zustand";

type Props = {
  sections: {
    841: "chni";
    842: "knitting";
  };
  setSections: (payload: any) => void;
};

export const useSectionsStore = create<Props>((set) => ({
  sections: {
    841: "chni",
    842: "knitting",
  },
  setSections: (payload: any) => set({ sections: payload }),
}));
