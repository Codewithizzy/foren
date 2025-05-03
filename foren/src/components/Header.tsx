import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Dialog, DialogActions, DialogContent, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header className="header-container">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Logo and Title */}
        <Box className="header-logo-container">
          <img 
            src="/logo192.png"
            alt="Logo"
            className="header-logo"
          />
          <h1 className="header-title">Foren</h1>
        </Box>

        {/* Hamburger Menu Icon */}
        <IconButton edge="end" className="menu-button" onClick={handleClickOpen}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Modal/Popup Dialog for Navigation */}
      <Dialog open={open} onClose={handleClose} className="nav-dialog">
        <DialogContent>
          <List className="nav-list">
            <ListItem button className="nav-list-item" onClick={handleClose} component={Link} to="/">
              <ListItemText primary="Home" className="nav-list-item-text" />
            </ListItem>
            <Divider className="nav-divider" />
            <ListItem button className="nav-list-item" onClick={handleClose} component={Link} to="/case-list">
              <ListItemText primary="Case List" className="nav-list-item-text" />
            </ListItem>
            <Divider className="nav-divider" />
            <ListItem button className="nav-list-item" onClick={handleClose} component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" className="nav-list-item-text" />
            </ListItem>
            <Divider className="nav-divider" />
            <ListItem button className="nav-list-item" onClick={handleClose} component={Link} to="/calibration">
              <ListItemText primary="Calibration" className="nav-list-item-text" />
            </ListItem>
            <Divider className="nav-divider" />
            <ListItem button className="nav-list-item" onClick={handleClose} component={Link} to="/settings">
              <ListItemText primary="Settings" className="nav-list-item-text" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="close-button">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;