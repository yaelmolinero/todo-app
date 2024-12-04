import { useState, useEffect } from 'react';
import { THEMES } from '../types.d';

import { useTheme } from '../hooks/useTheme.ts';
import { Light, Dark, System } from './Icons.tsx';

const THEMES_LIST = [
  {
    id: THEMES.LIGHT,
    name: "Claro",
    Icon: Light
  },
  {
    id: THEMES.DARK,
    name: "Oscuro",
    Icon: Dark
  },
  {
    id: THEMES.SYSTEM,
    name: "Sistema",
    Icon: System
  }
];

function ToggleTheme() {
  const [showThemes, setShowThemes] = useState<boolean>(false);
  const { currentTheme, setCurrentTheme } = useTheme();

  function closeThemeMenu() {
    setShowThemes(false);
  }
  
  useEffect(() => {
    if (showThemes)
      document.documentElement.addEventListener("click", closeThemeMenu);
    else
      document.documentElement.removeEventListener("click", closeThemeMenu);

    return () => {
      document.documentElement.removeEventListener("click", closeThemeMenu);
    }
  }, [showThemes]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setShowThemes(!showThemes);
  }

  return (
    <div className='relative'>
      <button type="button" onClick={handleClick} className='hover:scale-125 transition'>
        { currentTheme == THEMES.LIGHT && <Light /> }
        { currentTheme == THEMES.DARK && <Dark /> }
        { currentTheme == THEMES.SYSTEM && <System /> }
      </button>
      {
        showThemes && 
        <div className='absolute bottom-full left-0 py-2 rounded-lg bg-bgTertiary-light dark:bg-bgTertiary-dark w-36'>
          <ul>
            {
              THEMES_LIST.map(({ id, name, Icon }) => (
                <li key={id} onClick={() => setCurrentTheme(id)} className={`${currentTheme === id ? "text-blue-500" : ""} flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700`}>
                  <Icon className='size-6'/> { name }
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  );
}

export default ToggleTheme;
