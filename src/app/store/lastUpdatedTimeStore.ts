import { create } from "zustand";

interface timeState {
  lastUpdated: string;
  SetLastUpdated: (lastUpdated: string) => void;
}

const useLastUpdatedTimeStore = create<timeState>((set) => ({
  lastUpdated: "",
  SetLastUpdated: (time: string) => set({ lastUpdated: time }),
}));

export default useLastUpdatedTimeStore;
