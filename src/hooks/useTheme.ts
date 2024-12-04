import { useState, useEffect } from 'react';
import { THEMES } from '../types.d';

function getTheme(): THEMES {
  if (typeof localStorage !== "undefined")
    return localStorage.getItem("todo-app-theme") as THEMES ?? THEMES.SYSTEM;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
  }
  
  const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
  let remove: null | (() => void) = null;

  function updateTheme() {
    if (remove != null) {
      remove();
    }

    matchMedia.addEventListener("change", updateTheme);
    remove = function() {
      matchMedia.removeEventListener("change", updateTheme);
    }
    
    const currentTheme = getTheme();
    const isDark = currentTheme === THEMES.DARK || (currentTheme === THEMES.SYSTEM && matchMedia.matches);
    if (isDark)
      document.documentElement.classList.add("dark");
    else
      document.documentElement.classList.remove("dark");
  }

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<THEMES>(getTheme());

  useEffect(() => {
    localStorage.setItem("todo-app-theme", currentTheme);
    updateTheme();
  }, [currentTheme]);

  return {
    currentTheme,
    setCurrentTheme
  }
}
