import { create } from "zustand";

// package time State manage
type Store = {
  packageTimeId: string | number;
};

type Actions = {
  setPackageTimeId: (id: string | number) => void;
};

export const useSavePackageTimeId = create<Store & Actions>(
  (set): Store & Actions => ({
    packageTimeId: "",
    setPackageTimeId: (id) => set({ packageTimeId: id }),
  })
);
