import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher({ className = '' }) {
  const { theme, toggleTheme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <div className={`relative group ${className}`}>
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        ) : (
          <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          <button
            onClick={setLightTheme}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              theme === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Sun className="w-4 h-4" />
            Tema claro
          </button>
          
          <button
            onClick={setDarkTheme}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Moon className="w-4 h-4" />
            Tema oscuro
          </button>
          
          <button
            onClick={() => {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              if (systemTheme === 'light') setLightTheme();
              else setDarkTheme();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
          >
            <Monitor className="w-4 h-4" />
            Seguir sistema
          </button>
        </div>
      </div>
    </div>
  );
}
