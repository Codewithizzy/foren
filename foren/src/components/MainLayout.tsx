import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import NavDrawer from './NavDrawer';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <NavDrawer />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
