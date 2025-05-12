import React, { useState } from 'react';

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, defaultValue = '', className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab } as any);
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

const TabsList: React.FC<TabsListProps> = ({ children, className = '', activeTab, setActiveTab }) => {
  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab } as any);
        }
        return child;
      })}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  value, 
  children, 
  className = '', 
  activeTab, 
  setActiveTab 
}) => {
  const isActive = activeTab === value;

  return (
    <button
      className={`relative px-4 py-2 font-medium text-sm mr-2 rounded-md focus:outline-none transition-all duration-200 ease-in-out
        ${isActive 
          ? 'text-purple-600 bg-purple-50 border-b-2 border-purple-600'  // Active tab styles
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'      // Inactive tab styles
        } ${className}`}
      onClick={() => setActiveTab?.(value)}
    >
      {children}
    </button>
  );
};


interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '', activeTab }) => {
  return activeTab === value ? (
    <div className={`pt-4 ${className}`}>{children}</div>
  ) : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
