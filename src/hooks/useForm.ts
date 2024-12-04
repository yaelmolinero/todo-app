import { useReducer } from "react";
import { type Task, type TaskWithoutID, type CategoryId, type TaskDate, taskProperties, ActionEditTask } from "../types.d";

const newTask = {
  title: "",
  description: "",
  categoryId: null,
  priority: false,
  date: null,
  completed: false
};

function reducer(state: Task | TaskWithoutID, action: ActionEditTask): Task | TaskWithoutID {
  const { type } = action;

  if (type === taskProperties.TITLE){
    return { ...state, title: action.payload };}

  if (type === taskProperties.DESCRIPTION) {
    const value = action.payload.trim() !== "" ? action.payload : null;
    return { ...state, description: value };
  }

  if (type === taskProperties.CATEGORY) {
    if (action.payload !== "")
      return { ...state, categoryId: action.payload as CategoryId };

    return { ...state, categoryId: null };
  }

  if (type === taskProperties.PRIOTITY)
    return { ...state, priority: action.payload };

  if (type === taskProperties.DATE) {
    if (action.paylaod !== "")
      return { ...state, date: action.paylaod as TaskDate };
    
    return { ...state, date: null };
  }

  if (type === taskProperties.UPDATE) {
    if (action.payload == null)
      return newTask;

    return action.payload
  }

  return state;
}

export function useForm(task: Task | null) {
  const initialState =
    task != null
    ? task
    : newTask;

  const [state, dispatch] = useReducer(reducer, initialState);

  function editTitle(value: string) {
    dispatch({ type: taskProperties.TITLE, payload: value });
  }

  function editDescription(value: string) {
    dispatch({ type: taskProperties.DESCRIPTION, payload: value });
  }

  function editCategory(value: string) {
    dispatch({ type: taskProperties.CATEGORY, payload: value });
  }

  function editPriority(value: boolean) {
    dispatch({ type: taskProperties.PRIOTITY, payload: value });
  }

  function editDate(value: string) {
    dispatch({ type: taskProperties.DATE, paylaod: value });
  }

  function updateTask(task: Task | null) {
    dispatch({ type: taskProperties.UPDATE, payload: task });
  }

  return {
    currentTask: state,
    editTitle,
    editDescription,
    editCategory,
    editPriority,
    editDate,
    updateTask
  }
}
