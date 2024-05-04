import { create } from "zustand";

// package time State manage
type Store = {
  blogCategoryId: string | number;
};

type Actions = {
  setBlogCategoryId: (id: string | number) => void;
};

export const useSaveBlogCategoryId = create<Store & Actions>(
  (set): Store & Actions => ({
    blogCategoryId: "",
    setBlogCategoryId: (id) => set({ blogCategoryId: id }),
  })
);
