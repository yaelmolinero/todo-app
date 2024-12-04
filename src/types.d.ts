type CategoryId = `${string}-${string}-${string}-${string}-${string}`;
export type TaskId = `${string}-${string}-${string}-${string}`;
export type TaskTitle = string;
export type TaskDescription = string | null;
export type TaskCategory = CategoryId | null;
export type TaskPrority = boolean;
export type TaskDate = `${string}-${string}-${string}` | null;
export type TaskCompleted = boolean;

export interface Task {
  id: TaskId,
  title: TaskTitle,
  description: TaskDescription,
  categoryId: TaskCategory,
  priority: TaskPrority,
  date: TaskDate,
  completed: TaskCompleted,
}

export type TaskWithoutID = Omit<Task, 'id'>;

export interface Category {
  name: string,
  backgroundColor: `#${string}` | string,
  text: `#${string}` | string,
  color: `#${string}` | string,
}

export type CategoryMap = {
  [id: CategoryId]: Category
}

export enum STATUS_FILTERS {
  ALL = "all",
  ACTIVES = "actives",
  COMPLETED = "completed",
  PRIOTITY = "priority",
}

export type StatusButton = {
  title: string,
  value: filterBy
}

export enum THEMES {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system"
}

export enum taskProperties {
  TITLE = "title",
  DESCRIPTION = "description",
  CATEGORY = "category",
  PRIOTITY = "priority",
  DATE = "date",
  UPDATE = "UPDATE_TASK"
}

export type ActionEditTask = 
  | { type: taskProperties.TITLE, payload: string }
  | { type: taskProperties.DESCRIPTION, payload: string }
  | { type: taskProperties.CATEGORY, payload: string }
  | { type: taskProperties.PRIOTITY, payload: boolean }
  | { type: taskProperties.DATE, paylaod: string }
  | { type: taskProperties.UPDATE, payload: Task | null }

export type color = { text: string, background: string, color: string, checked?: string };

export interface IconProps {
  className?: string;
}
