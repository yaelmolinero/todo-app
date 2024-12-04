import { createContext, useReducer } from "react";
import { categoriesReducer, initialState } from './categoriesReducer.ts';
import { actionTypes, CategoryContextProps } from './categoryTypes.d';
import type { Category, CategoryId } from "../../types.d";

export const CategoriesContext = createContext<CategoryContextProps | undefined>(undefined);

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(categoriesReducer, initialState);

  function addCategory(newCategory: Category) {
    dispatch({ type: actionTypes.ADD, payload: newCategory });
  }

  function editCategory(id: CategoryId, category: Category) {
    dispatch({ type: actionTypes.EDIT, payload: { id, category } });
  }

  function deleteCategory(id: CategoryId) {
    dispatch({ type: actionTypes.DELETE, payload: id });
  }

  return (
    <CategoriesContext.Provider value={{ categories: state, addCategory, editCategory, deleteCategory }}>
      { children }
    </CategoriesContext.Provider>
  );
}
