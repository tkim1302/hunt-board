import { create } from "zustand";

interface timeState {
  lastUpdated: Date | null;
  SetLastUpdated: (lastUpdated: Date) => void;
}

const useLastUpdatedTimeStore = create<timeState>((set) => ({
  lastUpdated: null,
  SetLastUpdated: (time: Date) => set({ lastUpdated: time }),
}));

export default useLastUpdatedTimeStore;
