import React, { useState } from 'react';
import SideDrawer from './SideDrawer';

interface LayoutWithDrawerProps {
  children: React.ReactNode;
}

const LayoutWithDrawer: React.FC<LayoutWithDrawerProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Start with drawer closed

  const handleToggleDrawer = () => setDrawerOpen((prev) => !prev);

  const handleLogout = () => {
    // handle logout logic
    console.log('Logged out');
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onLogout={handleLogout} />
      <div style={{ flex: 1, marginLeft: drawerOpen ? '240px' : '0', transition: 'margin-left 0.3s' }}>
        {/* Show the hamburger button only when drawer is closed */}
        {!drawerOpen && (
          <button
            onClick={handleToggleDrawer}
            style={{
              margin: '1rem',
              border: 'none',
              background: 'none',
              padding: '10px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '30px',
              height: '25px',
            }}
          >
            {/* Hamburger icon using three divs */}
            <div style={{ width: '20px', height: '1px', backgroundColor: 'black' }} />
            <div style={{ width: '20px', height: '1px', backgroundColor: 'black' }} />
            <div style={{ width: '20px', height: '1px', backgroundColor: 'black' }} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default LayoutWithDrawer;
