import { create } from "zustand";
import { Section } from "@/app/types/types";

interface SectionState {
  sectionList: Section[];
  selectedSection: string;
  setSectionList: (sectionList: Section[]) => void;
  setSection: (section: string) => void;
}

const useSectionStore = create<SectionState>((set) => ({
  sectionList: [],
  selectedSection: "",
  setSectionList: (sectionList) => set({ sectionList }),
  setSection: (section: string) => set({ selectedSection: section }),
}));

export default useSectionStore;
