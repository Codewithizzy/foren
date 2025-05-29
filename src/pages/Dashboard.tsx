import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FolderOpen, Database, FileText, 
  UserCheck, Footprints, Camera, 
  MessageSquare, TrendingUp 
} from 'lucide-react';

// Mock data for statistics
const stats = [
  { id: 1, name: 'Active Cases', value: '24', icon: FolderOpen, color: 'bg-blue-500' },
  { id: 2, name: 'Evidence Items', value: '367', icon: Database, color: 'bg-green-500' },
  { id: 3, name: 'Custody Events', value: '152', icon: FileText, color: 'bg-purple-500' },
  { id: 4, name: 'Team Members', value: '18', icon: UserCheck, color: 'bg-yellow-500' },
];

// Mock data for recent activities
const activities = [
  { id: 1, user: 'Emma Wilson', action: 'uploaded new footwear evidence', target: 'Case #2453', time: '5 minutes ago' },
  { id: 2, user: 'John Smith', action: 'approved custody transfer for', target: 'Evidence #A-7382', time: '2 hours ago' },
  { id: 3, user: 'Michael Chen', action: 'completed analysis on', target: 'Crime Scene #CS-892', time: '4 hours ago' },
  { id: 4, user: 'Sarah Johnson', action: 'created new case', target: 'Case #2458', time: 'Yesterday' },
  { id: 5, user: 'David Lee', action: 'exported report for', target: 'Message Analysis #MA-341', time: 'Yesterday' },
];

// Mock data for analysis counts
const analysisCounts = [
  { type: 'Footwear', count: 87, icon: Footprints, color: 'bg-blue-500' },
  { type: 'Crime Scene', count: 124, icon: Camera, color: 'bg-red-500' },
  { type: 'Message', count: 56, icon: MessageSquare, color: 'bg-yellow-500' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="mt-2 sm:mt-0">
          <p className="text-gray-400">
            Welcome back, <span className="text-white">{user?.name}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-5 border-b border-gray-700">
            <h2 className="font-semibold text-lg text-white">Recent Activity</h2>
          </div>
          <div className="p-5">
            <ul className="space-y-4">
              {activities.map((activity) => (
                <li key={activity.id} className="flex items-start">
                  <div className="bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-white">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium text-blue-400">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-5 border-b border-gray-700">
            <h2 className="font-semibold text-lg text-white">Analysis Summary</h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {analysisCounts.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-md ${item.color}`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="ml-3 text-gray-300">{item.type} Analysis</span>
                  </div>
                  <span className="font-semibold text-white">{item.count}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Month-over-Month Growth</h3>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className="text-gray-400 text-sm ml-2">from last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;