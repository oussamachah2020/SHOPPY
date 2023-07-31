/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ProductType } from "../types/types";

// type ProductsState<T> = {
//   selectedProduct: ProductType | null;
//   setSelectedProduct: (product: ProductType) => void;
// };

const useProductsStore = create<any>(
  devtools(
    persist(
      (set) => ({
        selectedProduct: null,
        setSelectedProduct: (product: ProductType) =>
          set({ selectedProduct: product }),
      }),
      {
        name: "products-store", // Name used to store the data in local storage
      }
    )
  )
);

export default useProductsStore;
