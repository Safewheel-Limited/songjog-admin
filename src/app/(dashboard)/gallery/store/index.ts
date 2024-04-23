import { create } from "zustand";

export type ImageType = { id: number; fileUrl: string };
// select images state manage
type Store = {
  selectImages: ImageType[];
};

type Actions = {
  handleSelectImages: (item: ImageType) => void;
  resetSelectedImages: () => void;
};

export const useSelectImages = create<Store & Actions>(
  (set, get): Store & Actions => ({
    selectImages: [],
    handleSelectImages: (item: ImageType) => {
      const existSelectImage = get().selectImages;
      const filterImage = existSelectImage.filter(
        (image) => image.id === item.id
      );
      if (filterImage.length) {
        const updateSelectImage = existSelectImage.filter(
          (image) => image.id !== item.id
        );
        set({ selectImages: updateSelectImage });
      } else {
        const updateSelectImage = [...existSelectImage, item];
        set({ selectImages: updateSelectImage });
      }
    },
    resetSelectedImages: () => {
      set({ selectImages: [] });
    },
  })
);
