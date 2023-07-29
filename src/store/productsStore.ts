import create from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "../types/types";

type ProductsStore = {
  selectedProduct: ProductType | null;
  setSelectedProduct: (product: ProductType) => void;
};

export const productsStore = create<ProductsStore>(
  persist(
    (set) => ({
      selectedProduct: null,
      setSelectedProduct: (product: ProductType) =>
        set(() => ({
          selectedProduct: product,
        })),
    }),
    {
      name: "products-store", // Name used to store the data in local storage
    }
  )
);
