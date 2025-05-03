import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {
  return <Link to={to} style={{ margin: '0 1rem' }}>{label}</Link>;
};

export default NavItem;
