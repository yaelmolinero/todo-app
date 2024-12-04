import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { TodoProvider } from './contexts/todoContext/TodoContext.tsx';
import { CategoriesProvider } from './contexts/categoriesContext/CategoriesContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CategoriesProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </CategoriesProvider>
  </StrictMode>,
)
