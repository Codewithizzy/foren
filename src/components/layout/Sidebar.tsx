import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FolderOpen, 
  FileText, Database, Search, 
  MessageSquare, ShieldAlert, Settings, 
  LogOut, Footprints, Camera
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Cases', icon: <FolderOpen size={20} />, path: '/cases' },
    { name: 'Evidence', icon: <Database size={20} />, path: '/evidence' },
    { name: 'Footwear Analysis', icon: <Footprints size={20} />, path: '/analysis/footwear' },
    { name: 'Scene Analysis', icon: <Camera size={20} />, path: '/analysis/scene' },
    { name: 'Message Analysis', icon: <MessageSquare size={20} />, path: '/analysis/message' },
    { name: 'Chain of Custody', icon: <FileText size={20} />, path: '/custody' },
    { name: 'Search', icon: <Search size={20} />, path: '/search' },
  ];
  
  // Admin-only navigation items
  const adminItems = [
    { name: 'Security', icon: <ShieldAlert size={20} />, path: '/security' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="w-64 h-full bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="p-5">
        <div className="flex items-center">
          <div className="bg-blue-600 h-8 w-8 rounded-md flex items-center justify-center mr-2">
            <ShieldAlert size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Foren</h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center py-2 px-5 text-gray-300 hover:bg-gray-800 transition-colors ${
                    isActive ? 'bg-gray-800 border-l-4 border-blue-500 pl-4' : ''
                  }`
                }
              >
                <span className="mr-3 text-gray-400">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
          
          {user?.role === 'admin' && (
            <>
              <li className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Administration
              </li>
              {adminItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center py-2 px-5 text-gray-300 hover:bg-gray-800 transition-colors ${
                        isActive ? 'bg-gray-800 border-l-4 border-blue-500 pl-4' : ''
                      }`
                    }
                  >
                    <span className="mr-3 text-gray-400">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full py-2 px-4 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
        >
          <LogOut size={20} className="mr-3 text-gray-400" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;