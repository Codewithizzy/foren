import React from 'react';
import { X } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationsPanelProps {
  onClose: () => void;
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'New Evidence Uploaded',
    message: 'Case #2453: New fingerprint evidence has been added.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    link: '/evidence/123'
  },
  {
    id: '2',
    userId: '1',
    title: 'Custody Transfer Request',
    message: 'Officer Johnson has requested custody transfer for case #2453.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    link: '/custody/456'
  },
  {
    id: '3',
    userId: '1',
    title: 'Analysis Complete',
    message: 'Footwear analysis for case #2471 is now complete.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    link: '/analysis/footwear/789'
  }
];

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-10">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="font-medium">Notifications</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={18} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {mockNotifications.length > 0 ? (
          <div>
            {mockNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-gray-400">
                    {formatTimeAgo(notification.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-400">
            No new notifications
          </div>
        )}
      </div>
      
      <div className="p-2 text-center border-t border-gray-700">
        <button className="text-blue-500 hover:text-blue-400 text-sm">
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;