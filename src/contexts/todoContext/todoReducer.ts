import type { Task } from '../../types.d';
import { actionTypes, type Action } from './todoTypes.d';

function getLocalState(): Task[] {
  const localState = window.localStorage.getItem("react-todo-app");
  if (localState != null) return JSON.parse(localState) as Task[];

  return [];
}

function updateLocalStorage(data: Task[]) {
  window.localStorage.setItem("react-todo-app", JSON.stringify(data));
}

export const initialState = getLocalState();

export function todoReducer(state: Task[], action: Action): Task[] {

  const { type } = action;

  if (type === actionTypes.ADD) {
    const newTask = {
      ...action.payload,
      id: crypto.randomUUID(),
    };

    const newState = state.concat(newTask);
    updateLocalStorage(newState);
    return newState;
  }

  if (type === actionTypes.EDIT) {
    const oldTaskId = state.findIndex(task => task.id === action.payload.id);
    const oldTask = state[oldTaskId];

    const taskEdited = {
      ...oldTask,
      ...action.payload
    };

    // const newState = structuredClone(state);
    // newState[oldTaskId] = taskEdited;

    const newState = [
      ...state.slice(0, oldTaskId),
      taskEdited,
      ...state.slice(oldTaskId + 1)
    ];
    updateLocalStorage(newState);
    return newState;
  }

  if (type === actionTypes.DELETE) {
    const newState = state.filter(task => task.id !== action.payload);
    updateLocalStorage(newState);
    return newState;
  }

  if (type === actionTypes.TOGGLE) {
    const oldTaskId = state.findIndex(task => task.id === action.payload);
    const oldTask = state[oldTaskId];

    const newState = structuredClone(state);
    newState[oldTaskId] = {
      ...oldTask,
      completed: !oldTask.completed
    }

    updateLocalStorage(newState);
    return newState;
  }

  if (type === actionTypes.CLEAR) {
    const newState = state.filter(task => !task.completed);
    updateLocalStorage(newState);
    return newState;
  }

  if (type === actionTypes.REMOVE_CATEGORY) {
    const newState = state.map(task => task.categoryId === action.payload ? { ...task, categoryId: null }: task);
    updateLocalStorage(newState);
    return newState;
  }

  return state;
}
