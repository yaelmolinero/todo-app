import type { CategoryMap, Category, CategoryId } from '../../types.d';

export interface CategoryContextProps {
  categories: CategoryMap;
  addCategory: (newCategory: Category) => void;
  editCategory: (id: CategoryId, category: Category) => void;
  deleteCategory: (id: CategoryId) => void;
}

export enum actionTypes {
  ADD = "ADD_CATEGORY",
  EDIT = "EDIT_CATEGORY",
  DELETE = "DELETE_CATEGORY"
}

export type Action = 
  | { type: actionTypes.ADD, payload: Category }
  | { type: actionTypes.EDIT, payload: { id: CategoryId, category: Category } }
  | { type: actionTypes.DELETE, payload: CategoryId };