import { type StatusButton, STATUS_FILTERS, color } from "./types.d";

export const FILTER_BUTTONS: StatusButton[] = [
  {
    title: "Todas",
    value: STATUS_FILTERS.ALL
  },
  {
    title: "Activas",
    value: STATUS_FILTERS.ACTIVES
  },
  {
    title: "Completadas",
    value: STATUS_FILTERS.COMPLETED
  },
  {
    title: "Prioridad",
    value: STATUS_FILTERS.PRIOTITY
  }
] as const;

export const EVENTS = {
  PUSHSTATE: "pushstate",
  POPSTATE: "popstate",
}

export const BUTTONS = {
  PRIMARY: 0,
}

export const COLORS: color[] = [
  { text: "text-blue-700 dark:text-blue-300", background: "bg-blue-100 dark:bg-blue-500/10", color: "bg-blue-500", checked: "has-[:checked]:border-blue-500 has-[:checked]:bg-blue-200 dark:has-[:checked]:bg-blue-500/10" },
  { text: "text-green-700 dark:text-green-300", background: "bg-green-100 dark:bg-green-500/10", color: "bg-green-500", checked: "has-[:checked]:border-green-500 has-[:checked]:bg-green-200 dark:has-[:checked]:bg-green-500/10" },
  { text: "text-yellow-800 dark:text-yellow-300", background: "bg-yellow-100 dark:bg-yellow-500/10", color: "bg-yellow-500", checked: "has-[:checked]:border-yellow-500 has-[:checked]:bg-yellow-200 dark:has-[:checked]:bg-yellow-500/10" },
  { text: "text-red-700 dark:text-red-300", background: "bg-red-100 dark:bg-red-500/10", color: "bg-red-500", checked: "has-[:checked]:border-red-500 has-[:checked]:bg-red-200 dark:has-[:checked]:bg-red-500/10" },
  { text: "text-violet-700 dark:text-violet-300", background: "bg-violet-100 dark:bg-violet-500/10", color: "bg-violet-500", checked: "has-[:checked]:border-violet-500 has-[:checked]:bg-violet-200 dark:has-[:checked]:bg-violet-500/10" },
  { text: "text-pink-700 dark:text-pink-300", background: "bg-pink-100 dark:bg-pink-500/10",color: "bg-pink-500", checked: "has-[:checked]:border-pink-500 has-[:checked]:bg-pink-200 dark:has-[:checked]:bg-pink-500/10" },
];
