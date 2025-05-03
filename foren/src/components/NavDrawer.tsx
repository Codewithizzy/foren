import React from 'react';
import { Link } from 'react-router-dom';

const NavDrawer: React.FC = () => {
  return (
    <nav style={{ background: '#eee', padding: '1rem' }}>
      <Link to="/">Dashboard</Link> | <Link to="/cases">Cases</Link>
    </nav>
  );
};

export default NavDrawer;
