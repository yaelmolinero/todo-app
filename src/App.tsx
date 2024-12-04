import { useState, lazy, Suspense } from 'react';
import { useTodo } from './contexts/todoContext/useTodo.ts';
import { useCategories } from './contexts/categoriesContext/useCategories.ts';
import { useFilters } from './hooks/useFilters.ts';
import { FILTER_BUTTONS, } from './constants.ts';
import { type Task } from './types.d';

import TasksList from './components/TasksList.tsx';
import { Add } from './components/Icons.tsx';
import NavSidebar from './components/NavSidebar.tsx';
const Form = lazy(() => import('./components/Form.tsx'));

function App() {
  const { clearTasksCompleted } = useTodo();
  const { categories } = useCategories();
  const { taskFiltered, categoryFilter, statusFilter, setCategoryFilter, setStatusFilter, setSearchFilter } = useFilters();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  return (
    <>
      <NavSidebar
        currentCategory={categoryFilter}
        setSearchFilter={setSearchFilter}
        resetCategoryFilter={setCategoryFilter}
      />

      <main className='max-w-4xl w-full mx-auto px-4 py-8 flex-1 shrink-0 overflow-x-auto'>
        <div className='flex w-full items-center justify-between flex-wrap mb-8 pt-4 md:pt-0'>
          <h1 className='inline-flex items-center gap-5 text-4xl font-bold  mb-4 md:mb-0 text-primary-light dark:text-primary-dark'>
            { categoryFilter != null ? categories[categoryFilter].name : "Tareas" }
            <span className='text-xl rounded-sm px-2 py-0.5 bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300'>
              { taskFiltered.length }
            </span>
          </h1>
          <div className='flex items-center gap-2 mx-auto md:mx-0'>
            {
              FILTER_BUTTONS.map(({ title, value }) => {
                const isSelected = statusFilter === value ? "text-secondary-dark dark:text-secondary-light bg-bg-dark dark:bg-bg-light" : "bg-bgSecondary-light dark:bg-bgSecondary-dark text-primary-light dark:text-primary-dark";
                
                return <button
                  key={value}
                  type='button'
                  onClick={() => setStatusFilter(value)}
                  data-selected={statusFilter === value}
                  className={`${isSelected} text-sm px-3 py-1 rounded-full font-semibold transition-colors data-[selected=false]:hover:bg-bgTertiary-light dark:data-[selected=false]:hover:bg-bgTertiary-dark`}
                >
                  { title }
                </button>
              })
            }
          </div>
        </div>
        <button type="button" onClick={() => { setTaskToEdit(null); setShowForm(true) }} className='flex items-center gap-4 w-full px-1 py-4 border-t font-semibold text-lg transition hover:bg-bgSecondary-light dark:hover:bg-bgSecondary-dark text-secondary-light dark:text-secondary-dark border-border-light dark:border-border-dark'>
          <Add /> Crear Nueva Tarea
        </button>
        <TasksList todoList={taskFiltered} setTaskToEdit={setTaskToEdit} setShowForm={setShowForm} />
        <button onClick={clearTasksCompleted} className='mt-5 text-primary-light dark:text-primary-dark cursor-pointer'>Eliminar tareas completadas</button>
      </main>

      <Suspense fallback={null}>
        { showForm && <Form
            taskToEdit={taskToEdit}
            setTaskToEdit={setTaskToEdit}
            setShowForm={setShowForm}
          /> }
      </Suspense>
    </>
  )
}

export default App
