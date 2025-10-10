import { create } from "zustand";

type SectionMapping = {
  [key: string]: string;
};

type Props = {
  sections: SectionMapping;
  setSections: (payload: SectionMapping) => void;
  getSectionRoute: (podrId: string) => string;
};

export const useSectionsStore = create<Props>((set, get) => ({
  sections: {
    "841": "chni",
    "842": "knitting",
  },
  setSections: (payload: SectionMapping) => set({ sections: payload }),
  getSectionRoute: (podrId: string): string => {
    const sections = get().sections;
    return sections[podrId] || "home";
  },
}));
