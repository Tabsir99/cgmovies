import { create } from "zustand";

interface UIState {
  isMobile: boolean;
  isSearchModalOpen: boolean;
}

export const useUIStore = create<UIState>(() => ({
  isMobile: false,
  isSearchModalOpen: false,
}));
