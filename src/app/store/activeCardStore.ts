import { create } from "zustand";

interface CardState {
  activeCard: number | null;
  sourceSection: string | null;
  setActiveCard: (id: number | null) => void;
  setSourceSection: (section: string | null) => void;
}

const useActiveCardStore = create<CardState>((set) => ({
  activeCard: null,
  sourceSection: null,
  setActiveCard: (id) => set({ activeCard: id }),
  setSourceSection: (section) => set({ sourceSection: section }),
}));

export default useActiveCardStore;
