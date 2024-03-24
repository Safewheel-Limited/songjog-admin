import { create } from "zustand";

// modal State manage
type Store = {
  modal: string;
};

type Actions = {
  setModal: (value: string) => void;
};

export const useModal = create<Store & Actions>((set): Store & Actions => ({
  modal: "",
  setModal: (value) => set({ modal: value }),
}));
