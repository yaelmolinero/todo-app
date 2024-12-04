import { useContext } from "react";
import { CategoriesContext } from "./CategoriesContext.tsx";

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within ad CategoriesProvider");
  }

  return context;
}
