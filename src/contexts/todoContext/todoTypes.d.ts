import type { CategoryId, Task, TaskId, TaskWithoutID } from '../../types.d';

export interface TodoContextProps {
  todo: Task[];
  addTask: (newTask: TaskWithoutID) => void;
  editTask: (taskToEdit: Task) => void;
  deleteTask: (id: TaskId) => void;
  changeStatus: (id: TaskId) => void;
  clearTasksCompleted: () => void;
  removeCategory: (id: CategoryId) => void;
}

export enum actionTypes {
  ADD = "ADD_TASK",
  EDIT = "EDIT_TASK",
  DELETE = "DELETE_TASK",
  TOGGLE = "TOGGLE_STATUS",
  CLEAR = "CLEAR_COMPLETED",
  REMOVE_CATEGORY = "REMOVE_CATEGORY",
}

export type Action = 
  | { type: actionTypes.ADD, payload: TaskWithoutID }
  | { type: actionTypes.EDIT, payload: Task }
  | { type: actionTypes.DELETE, payload: TaskId }
  | { type: actionTypes.TOGGLE, payload: TaskId }
  | { type: actionTypes.CLEAR }
  | { type: actionTypes.REMOVE_CATEGORY, payload: CategoryId };
