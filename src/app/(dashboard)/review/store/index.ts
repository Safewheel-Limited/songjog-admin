import { create } from "zustand";

// package time State manage
type Store = {
  reviewId: string | number;
};

type Actions = {
  setReviewId: (id: string | number) => void;
};

export const useSaveReviewId = create<Store & Actions>(
  (set): Store & Actions => ({
    reviewId: "",
    setReviewId: (id) => set({ reviewId: id }),
  })
);
