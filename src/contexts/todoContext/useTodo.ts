import { useContext } from "react";
import { TodoContext } from './TodoContext.tsx';

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used whitin an TodoProvider");
  }

  return context;
}
