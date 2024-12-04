import { useEffect, FormEvent } from 'react';
import { useTodo } from '../contexts/todoContext/useTodo.ts';
import { useCategories } from '../contexts/categoriesContext/useCategories.ts';
import { useForm } from '../hooks/useForm.ts';
import type { Task } from '../types.d';

import { ChevronRight, Star, StarFill, Trash } from './Icons.tsx';

interface Props {
  taskToEdit: Task | null,
  setTaskToEdit: (nullable: null) => void,
  setShowForm: (show: boolean) => void,
}

function Form({ taskToEdit, setTaskToEdit, setShowForm }: Props) {
  const { addTask, editTask, deleteTask } = useTodo();
  const { categories } = useCategories();
  const { currentTask, editTitle, editDescription, editCategory, editPriority, editDate, updateTask } = useForm(taskToEdit);

  useEffect(() => {
    updateTask(taskToEdit);
  }, [taskToEdit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    taskToEdit == null ? addTask(currentTask) : editTask(currentTask as Task);
    
    setShowForm(false);
    setTaskToEdit(null);
  }

  function handleDelete() {
    const confirmDelete = confirm("¿Eliminar tarea?");
    if (confirmDelete) {
      if (taskToEdit != null) {
        deleteTask(taskToEdit.id);
      }

      closeForm();
    }
  }

  function closeForm() {
    document.querySelector("form")?.reset();
    setShowForm(false);
    setTaskToEdit(null);
  }

  return (
    <aside className='block-scroll flex flex-col z-10 absolute md:sticky top-0 right-0 max-w-md w-full shrink-0 h-dvh p-4 shadow-xl dark:shadow-neutral-900 bg-bgSecondary-light dark:bg-bgSecondary-dark'>
      <div className='flex items-center justify-between mb-6'>
        <button type="button" onClick={closeForm} className='p-1 rounded-lg text-secondary-light dark:text-secondary-dark hover:bg-bgTertiary-light dark:hover:bg-bgTertiary-dark'>
          <ChevronRight />
        </button>
        <div className='flex items-center gap-2'>
          <button type='button' onClick={handleDelete} className='p-1 rounded-lg text-secondary-light dark:text-secondary-dark hover:bg-bgTertiary-light dark:hover:bg-bgTertiary-dark'>
            <Trash />
          </button>
          <button type="button" onClick={() => editPriority(!currentTask.priority)} className='p-1 rounded-lg text-secondary-light dark:text-secondary-dark hover:bg-bgTertiary-light dark:hover:bg-bgTertiary-dark'>
            { currentTask.priority ? <StarFill className='size-6'/> : <Star className='size-6'/> }
          </button>
        </div>
      </div>
      {/* <header className='mb-6'>
        <h2 className='text-2xl font-bold text-primary-light dark:text-primary-dark'>Task:</h2>
      </header> */}
      <form onSubmit={handleSubmit} className='flex-1 relative *:text-primary-light *:dark:text-primary-dark [&>div]:mb-4'>
        <input
          type="text" name="title" id="title" autoComplete="off" placeholder="Tarea"
          value={currentTask.title}
          onChange={(e) => editTitle(e.target.value)}
          className='block w-full rounded-lg bg-inherit p-2 mb-4 text-2xl font-semibold focus:outline-none'
        />
        <textarea
          name="description" id="description" placeholder="Descripción" rows={4}
          value={currentTask.description ?? ""}
          onChange={(e) => editDescription(e.target.value)}
          className="block w-full rounded-lg bg-inherit resize-none p-2 mb-4 text-base border border-border-light dark:border-border-dark focus:outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-700"
        ></textarea>
        <div>
          <label htmlFor="category" className='inline-block w-24'>Categoría:</label>
          <select
            name="category" id="category"
            value={currentTask.categoryId ?? ""}
            onChange={(e) => editCategory(e.target.value)}
            className='px-2 rounded-lg bg-bgSecondary-light dark:bg-bgSecondary-dark border border-border-light dark:border-border-dark focus:outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-700'
          >
            <option value="" className='p-1'>Vacío</option>
            {
              Object.entries(categories).map(([id, category]) => (
                <option key={id} value={id} className='p-1'>{ category.name }</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="date" className='inline-block w-24'>Fecha:</label>
          <input
            type="date" name="date" id="date"
            value={currentTask.date ?? ""}
            onChange={(e) => editDate(e.target.value)}
            className='px-2 rounded-lg bg-inherit border border-border-light dark:border-border-dark focus:outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-700'
          />
        </div>

        <div className='flex gap-4 absolute bottom-0 w-full [&>button]:font-semibold [&>button]:rounded-lg'>
          <button type="reset" className='py-1 w-full outline outline-1 outline-bgTertiary-light dark:outline-bgTertiary-dark' onClick={closeForm}>Cancelar</button>
          <button type="submit" className='py-1 w-full bg-bg-dark dark:bg-bg-light text-primary-dark dark:text-primary-light hover:bg-bgTertiary-dark dark:hover:bg-bgTertiary-light'>Guardar</button>
        </div>
      </form>
    </aside>
  );
}

export default Form;
