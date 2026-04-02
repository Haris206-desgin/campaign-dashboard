import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useDarkMode } from '../../hooks/useDarkMode';

const Layout = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;