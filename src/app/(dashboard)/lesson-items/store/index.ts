import { create } from "zustand";

// package time State manage
type Store = {
  lessonItemId: string | number;
};

type Actions = {
  setLessonItemId: (id: string | number) => void;
};

export const useSaveLessonItemId = create<Store & Actions>(
  (set): Store & Actions => ({
    lessonItemId: "",
    setLessonItemId: (id) => set({ lessonItemId: id }),
  })
);
