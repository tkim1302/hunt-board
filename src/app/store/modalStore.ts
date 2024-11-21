import { create } from "zustand";
import { Job } from "../types/types";

interface ModalState {
  isOpen: boolean;
  isEdit: boolean;
  selectedJob: Job | null;
  openModal: () => void;
  closeModal: () => void;
  setEditTrue: () => void;
  setEditFalse: () => void;
  setSelectedJob: (job: Job) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  isEdit: false,
  selectedJob: null,
  setEditTrue: () => set({ isEdit: true }),
  setEditFalse: () => set({ isEdit: false }),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setSelectedJob: (job) => set({ selectedJob: job }),
}));

export default useModalStore;
