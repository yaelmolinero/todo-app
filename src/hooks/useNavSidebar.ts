import { useState, useEffect, useRef } from "react";
import { useTodo } from "../contexts/todoContext/useTodo.ts";
import { useCategories } from "../contexts/categoriesContext/useCategories.ts";
import { EVENTS } from "../constants.ts";
import type { Category, CategoryId } from "../types.d";

interface CategoryToEdit extends Category {
  id: string;
}

export function useNavSidebar() {
  const { removeCategory } = useTodo();
  const { categories, deleteCategory } = useCategories();
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryToEdit | null>(null);
  const [expand, setExpand] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (activeCategory)
      document.documentElement.addEventListener("click", closeCategoryOptions);
    else
      document.documentElement.removeEventListener("click", closeCategoryOptions);
    
    return () => {
      document.documentElement.removeEventListener("click", closeCategoryOptions);
    }
  }, [activeCategory]);

  function handleCategoryOption(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    event.stopPropagation();

    if (activeCategory === id)
      return setActiveCategory(null);
  
    setActiveCategory(id);
  }

  function handleDeleteCategory(id: CategoryId) {
    deleteCategory(id);
    removeCategory(id);

    if (window.location.pathname !== "/") {
      window.history.pushState({}, '', "/");
      const navigationEvent = new Event(EVENTS.PUSHSTATE);
      window.dispatchEvent(navigationEvent);
    }
  }

  function openModal() {
    if (modal.current != null)
      modal.current.showModal()
  }

  function closeCategoryOptions() {
    setActiveCategory(null);
  }

  function closeMobileNavbar() {
    if (window.innerWidth < 768)
      setExpand(false);
  }

  return {
    categories,
    activeCategory,
    categoryToEdit,
    expand,
    modal,
    setExpand,
    handleCategoryOption,
    handleDeleteCategory,
    openModal,
    setCategoryToEdit,
    closeMobileNavbar
  }
}
