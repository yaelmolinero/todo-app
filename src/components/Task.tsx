import { useTodo } from '../contexts/todoContext/useTodo.ts';
import { useCategories } from '../contexts/categoriesContext/useCategories.ts';
import type { Task } from '../types.d';

import { Calendar, Trash } from './Icons.tsx';

interface Props extends Task {
  editTaskInfo: (task: Task) => void
}

function Task({ id, title, description, categoryId, completed, priority, date, editTaskInfo }: Props) {
  const { changeStatus, deleteTask } = useTodo();
  const { categories } = useCategories();

  const categoryInfo = categoryId != null ? categories[categoryId] : null;
  const categoryStyle = categoryInfo != null && `${categoryInfo.backgroundColor} ${categoryInfo.text}`;
  const isPriority = priority ? "bg-yellow-200 dark:bg-yellow-500/30 border-yellow-300 accent-yellow-500 dark:accent-yellow-300" : "border-slate-300 accent-gray-500 dark:accent-gray-600";
  const isCompleted = completed ? "line-through text-neutral-700" : "";

  return (
    <div className='group flex items-center justify-between gap-6 px-1 py-4 border-t cursor-pointer text-primary-light dark:text-primary-dark border-border-light dark:border-border-dark'>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => changeStatus(id)}
        className={`size-5 appearance-none border-2 rounded-sm ${isPriority} checked:appearance-auto`}
      />
      <div
        onClick={() => editTaskInfo({id, title, description, categoryId, priority, date, completed})}
        className='flex-1 overflow-x-hidden whitespace-nowrap text-ellipsis cursor-pointer'
      >
        <label className={`text-2xl ${isCompleted}`}>{ title }</label>
        { description != null && <p className='text-sm overflow-x-hidden whitespace-nowrap text-ellipsis text-secondary-light dark:text-secondary-dark'>{ description }</p>}
        <div className='flex items-center gap-2 text-sm'>
          { date && <span className='inline-flex items-center gap-1 font-semibold text-secondary-light dark:text-secondary-dark'><Calendar className="size-5" /> { date }</span> }
          { categoryInfo != null && <span className={`${categoryStyle} rounded-full px-2 py-0.5`}>{ categoryInfo.name }</span> }
        </div>
      </div>
      <button
        type="button"
        aria-label='Eliminar tarea'
        onClick={() => deleteTask(id)}
        className='hidden group-hover:block px-2 text-secondary-light dark:text-secondary-dark group/icon hover:drop-shadow-icon'
      >
        <Trash className='group-hover/icon:stroke-red-600 size-6' />
      </button>
    </div>
  );
}

export default Task;
