import { useState, useEffect, useMemo } from "react";
import { useTodo } from "../contexts/todoContext/useTodo.ts";
import { useCategories } from "../contexts/categoriesContext/useCategories.ts";
import { EVENTS } from '../constants.ts';
import { type TaskCategory, STATUS_FILTERS } from "../types.d";

export function useFilters() {
  const { categories } = useCategories();
  const { todo } = useTodo();

  const [categoryFilter, setCategoryFilter] = useState<TaskCategory>(null);
  const [statusFilter, setStatusFilter] = useState<STATUS_FILTERS>(STATUS_FILTERS.ALL);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    function onLocationChanged() {
      const params = new URLSearchParams(window.location.search);
      const filter = params.get("category") as TaskCategory;

      if (filter == null)
        return setCategoryFilter(null);

      categories[filter] != null ? setCategoryFilter(filter) : setCategoryFilter(null);
    }

    onLocationChanged();
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChanged);
    window.addEventListener(EVENTS.POPSTATE, onLocationChanged);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChanged);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChanged);
    }
  }, [categories]);

  const taskFilteredByCategory = useMemo(() => {
    if (categoryFilter != null && categories[categoryFilter] != null) {
      return todo.filter(task => task.categoryId === categoryFilter && task.categoryId != null);
    }

    return todo;
  }, [todo, categoryFilter]);

  const taskFilteredByStatus = useMemo(() => {
    if (statusFilter === STATUS_FILTERS.PRIOTITY)
      return taskFilteredByCategory.filter(task => task.priority);

    if (statusFilter === STATUS_FILTERS.ACTIVES)
      return taskFilteredByCategory.filter(task => !task.completed);

    if (statusFilter === STATUS_FILTERS.COMPLETED)
      return taskFilteredByCategory.filter(task => task.completed);

    return taskFilteredByCategory;
  }, [taskFilteredByCategory, statusFilter]);

  const taskFiltered = useMemo(() => {
    if (searchFilter === "")
      return taskFilteredByStatus;

    return taskFilteredByStatus.filter(task => task.title.includes(searchFilter));
  }, [searchFilter, categoryFilter, statusFilter, taskFilteredByStatus]);

  return {
    taskFiltered,
    categoryFilter,
    statusFilter,
    setCategoryFilter,
    setStatusFilter,
    setSearchFilter
  }
}
