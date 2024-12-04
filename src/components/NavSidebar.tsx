import { useState, lazy, Suspense } from 'react';
import { useNavSidebar } from '../hooks/useNavSidebar.ts';
import type { TaskCategory, Category, CategoryId } from '../types.d';

import { Add, Menu, Search, List, ThreeDots } from './Icons.tsx';
import NavItem from './NavItem.tsx';
import NavLink from './NavLink.tsx';
import ToggleTheme from './ToggleTheme.tsx';
const CategoryMenu = lazy(() => import('./CategoryMenu.tsx'));

interface CategoryToEdit extends Category {
  id: string
}

interface Props {
  currentCategory: TaskCategory,
  setSearchFilter: (query: string) => void,
  resetCategoryFilter: (setFilter: TaskCategory) => void
}

function NavSidebar({ currentCategory, setSearchFilter, resetCategoryFilter }: Props) {
  const {
    categories, activeCategory, expand, modal,
    setExpand, openModal, handleCategoryOption, handleDeleteCategory, closeMobileNavbar
  } = useNavSidebar();

  const [categoryToEdit, setCategoryToEdit] = useState<CategoryToEdit | null>(null);

  function handleEditCategory(category: CategoryToEdit) {
    setCategoryToEdit(category)
    openModal();
  }

  function handleDelete(id: CategoryId) {
    resetCategoryFilter(null);
    handleDeleteCategory(id);
  }

  const isExpanded = expand ? "is-visible w-full md:w-80 shrink-0 shadow-xl translate-x-0 dark:shadow-neutral-900" : "-translate-x-full md:translate-x-0 md:w-14";

  return (
    <div className={`relative ${expand ? "block-scroll": ""}`}>
      <button type="button" className='absolute md:hidden top-4 right-4 text-primary-light dark:text-primary-dark' onClick={() => setExpand(true)}><Menu /></button>

      <nav className={`group h-dvh z-10 absolute md:sticky top-0 ${isExpanded} transition-all bg-bgSecondary-light dark:bg-bgSecondary-dark`}>
        <div className='flex flex-col h-full p-4 text-primary-light dark:text-primary-dark'>
          <header className='flex items-center justify-between mb-5'>
            <h3 className='hidden group-[.is-visible]:block text-2xl font-bold'>Menu</h3>
            <button type="button" onClick={() => setExpand(!expand)}>
              <Menu />
            </button>
          </header>
          <div className='flex-1 *:mb-5'>
            <form onSubmit={(e) => {e.preventDefault(); closeMobileNavbar()}} className='hidden group-[.is-visible]:block'>
              <label className="relative block">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <Search />
                </span>
                <input
                  autoComplete='off'
                  placeholder="Buscar tarea" type="text" name="search"
                  onChange={(event) => setSearchFilter(event.currentTarget.value)}
                  className="block w-full py-2 pl-9 pr-3 bg-inherit border border-border-light dark:border-border-dark rounded-lg shadow-md focus:outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-700"
                />
              </label>
            </form>

            <div>
              <h4 className='hidden group-[.is-visible]:block font-semibold text-lg'>Tareas</h4>
              <ul>
                <NavItem isSelected={currentCategory == null} handleClick={closeMobileNavbar}>
                  <NavLink href='/'>
                    <List className='size-6 transition group-hover/item:scale-125' />
                    <span className="hidden group-[.is-visible]:inline">Todas</span>
                  </NavLink>
                </NavItem>
              </ul>
            </div>

            <div className='bg-neutral-400 dark:bg-neutral-700 h-px'></div>

            <div>
              <h4 className='hidden group-[.is-visible]:block font-semibold text-lg'>Categorias</h4>
              <ul id='categories-list'>
                {
                  Object.entries(categories).map(([id, category]) => {
                    return (
                      <NavItem key={id} isSelected={id === currentCategory} handleClick={closeMobileNavbar}>
                        <NavLink href={`/?category=${id}`}>
                          <div className={`size-5 rounded-sm transition group-hover/item:scale-125 ${category.color}`}></div>
                          <span className='hidden group-[.is-visible]:inline-block flex-1'>{ category.name }</span>
                        </NavLink>
                        <div className="relative hidden group-[.is-visible]:block">
                          <button type="button" onClick={(event) => handleCategoryOption(event, id)} className='p-2 text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark'><ThreeDots className='size-4'/></button>
                          { activeCategory === id && (
                            <div className='category-options absolute left-0 bottom-full py-2 rounded-lg shadow-md bg-bgTertiary-light dark:bg-bgTertiary-dark'>
                              <ul>
                                <li className='px-3 py-1 hover:bg-bgSecondary-light dark:hover:bg-bgSecondary-dark'>
                                  <button type="button" onClick={() => handleEditCategory({ id, ...category })}>Editar</button>
                                </li>
                                <li className='px-3 py-1 hover:bg-bgSecondary-light dark:hover:bg-bgSecondary-dark'>
                                  <button type="button" onClick={() => handleDelete(id as CategoryId)}>Eliminar</button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </NavItem>
                    );
                  })
                }
              </ul>
              <button
                type="button" onClick={openModal}
                className='group/button w-full flex items-center gap-2 font-semibold group-[.is-visible]:px-2 py-2 rounded-lg transition-colors hover:bg-bgTertiary-light dark:hover:bg-bgTertiary-dark'>
                <Add className='size-6 transition group-hover/button:scale-125'/>
                <span className='hidden group-[.is-visible]:inline'>Agregar Nueva Categoría</span>
              </button>

              <Suspense fallback={null}>
                <CategoryMenu
                  categoryToEdit={categoryToEdit}
                  setCategoryToEdit={setCategoryToEdit}
                  refModal={modal}
                />
              </Suspense>
            </div>
          </div>

          <ToggleTheme />
        </div>
      </nav>
    </div>
  );
}

export default NavSidebar;
