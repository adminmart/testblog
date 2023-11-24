import { StateCreator } from "zustand";

export interface ProductType {
  id?: number;
  templateName?: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: string;
  subtitle?: string;
  livePreview?: string;
  details?: string;
  price?: number;
  popularity?: number;
}

export interface ProductSlice {
  products: ProductType[];
  sortBy: string;
  appType: string;
  isLoading: boolean;
  isSelected?: string;
  fetchProducts: () => void;
}

export const createThemeSlice: StateCreator<ProductSlice> = (set) => ({
  products: [],
  sortBy: "all",
  appType: "all",
  isLoading: false,
  isSelected: "",

  fetchProducts: async () => {
    try {
      set(() => ({ isLoading: true }));
      const res = await fetch(
        "https://adminmart.github.io/template_api/api.json"
      );
      set({ products: await res.json(), isLoading: false });
    } catch (err: any) {
      console.log("opps data not found");
    }
  },
  handleSortBy: (srt: string) => set(() => ({ sortBy: srt })),
  handleByAppType: (srt: string) => set(() => ({ appType: srt })),
  handleSelected: (slt: string) => set(() => ({ isSelected: slt })),
});
