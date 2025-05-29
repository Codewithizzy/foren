import React, { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationsPanel from '../common/NotificationsPanel';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-gray-700 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <button className="md:hidden mr-3 text-gray-400 hover:text-white">
          <Menu size={24} />
        </button>
        <div className="relative hidden sm:block w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Search size={18} />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            className="text-gray-400 hover:text-white relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
              3
            </span>
          </button>
          
          {showNotifications && (
            <NotificationsPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 text-right hidden sm:block">
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs text-gray-400">{user?.role.replace('_', ' ')}</div>
          </div>
          <div className="h-8 w-8 rounded-full overflow-hidden">
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;