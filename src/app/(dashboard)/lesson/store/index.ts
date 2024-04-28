import { create } from "zustand";

// package time State manage
type Store = {
  lessonId: string | number;
};

type Actions = {
  setLessonId: (id: string | number) => void;
};

export const useSaveLessonId = create<Store & Actions>(
  (set): Store & Actions => ({
    lessonId: "",
    setLessonId: (id) => set({ lessonId: id }),
  })
);
