import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Campaign Dashboard</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Real-time performance metrics</p>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? (
            <SunIcon className="h-5 w-5 text-yellow-500" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;