import { createContext, useReducer } from "react";
import { todoReducer, initialState } from "./todoReducer.ts";
import type { Task, TaskId, TaskWithoutID, CategoryId } from "../../types.d";
import { actionTypes, TodoContextProps } from "./todoTypes.d";

export const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  function addTask(newTask: TaskWithoutID) {
    dispatch({ type: actionTypes.ADD, payload: newTask });
  }

  function editTask(taskEdited: Task) {
    dispatch({ type: actionTypes.EDIT, payload: taskEdited });
  }

  function deleteTask(id: TaskId) {
    dispatch({ type: actionTypes.DELETE, payload: id });
  }

  function changeStatus(id: TaskId) {
    dispatch({ type: actionTypes.TOGGLE, payload: id });
  }

  function clearTasksCompleted() {
    dispatch({ type: actionTypes.CLEAR });
  }

  function removeCategory(id: CategoryId) {
    dispatch({ type: actionTypes.REMOVE_CATEGORY, payload: id });
  }

  return (
    <TodoContext.Provider value={{ todo: state, addTask, editTask, deleteTask,changeStatus, clearTasksCompleted, removeCategory }}>
      { children }
    </TodoContext.Provider>
  );
}
