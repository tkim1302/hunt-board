import { create } from "zustand";

interface loadingState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useLoadingStore = create<loadingState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));

export default useLoadingStore;
