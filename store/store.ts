import { create } from "zustand";
import { createThemeSlice } from "./slice/createThemeSlice";
import { persist } from "zustand/middleware";

export const useStore = create<any>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
    }),
    { name: "use-store" }
  )
);
