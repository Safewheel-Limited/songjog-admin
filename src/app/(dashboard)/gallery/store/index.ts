import { create } from "zustand";

// select images state manage
type Store = {
  selectImages: number[];
};

type Actions = {
  handleSidebarMenuCollapse: (id: number) => void;
};

export const useSelectImages = create<Store & Actions>(
  (set, get): Store & Actions => ({
    selectImages: [],
    handleSidebarMenuCollapse: (id) => {
      const existSelectImage = get().selectImages;
      if (existSelectImage.includes(id)) {
        const updateSelectImage = existSelectImage.filter(
          (item) => item !== id
        );
        set({ selectImages: updateSelectImage });
      } else {
        const updateSelectImage = [...existSelectImage, id];
        set({ selectImages: updateSelectImage });
      }
    },
  })
);
