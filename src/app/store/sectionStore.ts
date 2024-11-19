import { create } from "zustand";

interface SectionState {
  selectedSection: string;
  setSection: (section: string) => void;
}

const useSectionStore = create<SectionState>((set) => ({
  selectedSection: "",
  setSection: (section: string) => set({ selectedSection: section }),
}));

export default useSectionStore;
