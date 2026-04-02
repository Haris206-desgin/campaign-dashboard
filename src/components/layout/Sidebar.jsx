// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { 
//   HomeIcon, 
//   PresentationChartLineIcon, 
//   DocumentTextIcon, 
//   Cog6ToothIcon,
//   UsersIcon 
// } from '@heroicons/react/24/outline';

// const navigation = [
//   { name: 'Dashboard', href: '/', icon: HomeIcon },
//   { name: 'Campaigns', href: '/campaigns', icon: PresentationChartLineIcon },
//   { name: 'Brief Builder', href: '/brief-builder', icon: DocumentTextIcon },
//   { name: 'Clients', href: '/clients', icon: UsersIcon },
//   { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
// ];

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
//       <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
//         <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">AdDash</h1>
//       </div>
//       <nav className="mt-6">
//         {navigation.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.href}
//             className={({ isActive }) =>
//               `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
//                 isActive
//                   ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-600'
//                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
//               }`
//             }
//           >
//             <item.icon className="h-5 w-5 mr-3" />
//             {item.name}
//           </NavLink>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;




import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  PresentationChartLineIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon,
  UsersIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Campaigns', href: '/campaigns', icon: PresentationChartLineIcon },
  { name: 'Brief Builder', href: '/brief-builder', icon: DocumentTextIcon },
  { name: 'Clients', href: '/clients', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon }, // This is already present
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">AdDash</h1>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
