import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Database, 
  FileText,
  Search
} from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Cases', icon: <FolderOpen size={20} />, path: '/cases' },
    { name: 'Evidence', icon: <Database size={20} />, path: '/evidence' },
    { name: 'Custody', icon: <FileText size={20} />, path: '/custody' },
    { name: 'Search', icon: <Search size={20} />, path: '/search' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center py-3 flex-1 ${
                isActive ? 'text-blue-500' : 'text-gray-400 hover:text-gray-200'
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;