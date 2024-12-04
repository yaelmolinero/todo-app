import { FormEvent } from "react";
import { useCategories } from "../contexts/categoriesContext/useCategories.ts";
import type { Category, CategoryId } from "../types.d";
import { COLORS } from "../constants.ts";

import { Close } from "./Icons.tsx";

interface CategoryToEdit extends Category {
  id: string
}

interface Props {
  refModal: React.RefObject<HTMLDialogElement>,
  categoryToEdit: CategoryToEdit | null,
  setCategoryToEdit: (category: CategoryToEdit | null) => void
}

function CategoryMenu({ refModal, categoryToEdit, setCategoryToEdit }: Props) {
  const { addCategory, editCategory } = useCategories();

  function handleChange(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name-category") as string | null;
    const style = formData.get("themes");
    const submitBtn = document.querySelector<HTMLButtonElement>("#category-form button[type='submit']");
    
    if (submitBtn != null) {
      if ((name != null && name.trim() !== "") && style != null)
        submitBtn.removeAttribute("disabled");
      else
        submitBtn.setAttribute("disabled", "");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name-category") as string;
    const style = formData.get("themes") as string;
    const [text, backgroundColor, color] = style.split("|");
    
    if (name === "" || style === "") throw new Error("La información de la categoría esta incompleta.");
    const submitBtn = document.querySelector<HTMLButtonElement>("#category-form button[type='submit']");
    submitBtn?.setAttribute("disabled", "");

    const category = { name, text, backgroundColor, color };
    categoryToEdit == null ? addCategory(category) : editCategory(categoryToEdit.id as CategoryId, category);
    handleClose();
  }

  function handleClose() {
    setCategoryToEdit(null);
    document.querySelector<HTMLFormElement>("form#category-form")?.reset();
    refModal.current?.close();
  }

  return (
    <dialog ref={refModal} onClose={handleClose} id="dialog" className="fixed max-w-lg w-full p-4 rounded-lg shadow-2xl bg-bgSecondary-light dark:bg-bgSecondary-dark text-primary-light dark:text-primary-dark">
      <header className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-lg">Crear nueva categoría</h4>
        <button onClick={handleClose}>
          <Close className="size-5" />
        </button>
      </header>

      <form onSubmit={handleSubmit} onChange={handleChange} id="category-form">
        <label htmlFor="name-category" className="block w-full mb-4 font-semibold">
          Nombre:
          <input
            type="text"
            name="name-category"
            id="name-category"
            placeholder="Escriba el nombre de su categoría"
            autoComplete="off"
            autoFocus
            required
            defaultValue={categoryToEdit != null ? categoryToEdit.name : ""}
            className="w-full p-2 mt-2 rounded-lg bg-inherit font-normal border border-border-light dark:border-border-dark focus:outline-0 focus:border-sky-700 focus:ring-2 focus:ring-sky-700"
          />
        </label>

        <h5 className="font-semibold mb-1">Color de la categoría:</h5>
        <div className="flex gap-4 flex-wrap mb-4">
          {
            COLORS.map(({ text, background, color, checked }, id) => 
              <label key={id} htmlFor={`theme-${id}`} className="text-sm font-medium text-bgSecondary-light dark:text-bgSecondary-dark">
                <div className={`relative size-16 rounded-xl forced-colors:border-0 bg-transparent border border-transparent hover:bg-bgTertiary-light hover:dark:bg-bgTertiary-dark ${checked} grid items-center justify-center`}>
                  <input
                    type="radio"
                    name="themes"
                    id={`theme-${id}`}
                    value={`${text}|${background}|${color}`}
                    defaultChecked={categoryToEdit != null && categoryToEdit.color === color}
                    className="forced-colors:appearance-auto appearance-none"
                    required
                  />
                  <p className="forced-colors:block hidden">Cyan</p>
                  <div className={`absolute left-3 top-3 size-6 rounded-full ${background} forced-color:hidden`}></div>
                  <div className={`absolute bottom-3 right-3 size-6 rounded-full ${color} ring-2 ring-current forced-colors:hidden`}></div>
                </div>
              </label>
            )
          }
        </div>

        <div className="flex justify-end gap-5 font-semibold">
          <button type="button" onClick={handleClose} className="px-5 py-1 rounded-lg outline outline-1 outline-bg-dark dark:outline-bg-light">Cancelar</button>
          <button type="submit" disabled className="px-5 py-1 rounded-lg bg-bg-dark dark:bg-bg-light disabled:opacity-70 text-primary-dark dark:text-primary-light disabled:cursor-not-allowed">
            { categoryToEdit != null ? "Guardar" : "Crear" }
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default CategoryMenu;
