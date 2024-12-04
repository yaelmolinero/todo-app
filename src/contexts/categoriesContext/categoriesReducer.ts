import { actionTypes, Action } from "./categoryTypes.d";
import type { CategoryMap } from "../../types.d";

function getLocalState(): CategoryMap {
  const localState = window.localStorage.getItem("todo-categories");
  if (localState != null) return JSON.parse(localState) as CategoryMap;

  return {};
}

function updateLocalStorage(data: CategoryMap) {
  window.localStorage.setItem("todo-categories", JSON.stringify(data));
}

export const initialState = getLocalState();

export function categoriesReducer(state: CategoryMap, action: Action): CategoryMap {
  const { type } = action;

  if (type === actionTypes.ADD) {
    const id = crypto.randomUUID();
    const { name, backgroundColor, text, color } = action.payload;
    const newState = { ...state, [id]: { name, backgroundColor, text, color } };

    updateLocalStorage(newState);
    return newState;
  }

  if (type === actionTypes.EDIT) {
    const { id, category } = action.payload;
    const newState = { ...state, [id]: category };
    
    updateLocalStorage(newState);
    return newState;
  }

  if (type === actionTypes.DELETE) {
    const { [action.payload]: _, ...rest } = state;
    
    updateLocalStorage(rest);
    return rest;
  }

  return state;
}
