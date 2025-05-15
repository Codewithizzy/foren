import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NavDrawer } from './NavDrawer';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Header onMenuToggle={handleDrawerToggle} />
      <NavDrawer open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
          mt: 8 // Offset for header
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};