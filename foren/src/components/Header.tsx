import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <header className="header-container">
      <Box className="header-inner">
        <Box className="header-left">
          <Link to="/" className="header-brand">
            <img src="/logo192.png" alt="Foren Logo" className="header-logo" />
            <span className="header-title">Foren</span>
          </Link>
          
          <nav className="nav-links">
            <Link to="/features">Features</Link>
            <Link to="/docs">Docs</Link>
            <Link to="/about">About</Link>
          </nav>
        </Box>

        <Box className="header-right">
          <Link to="/auth" className="login-button">
            Sign in
          </Link>
          <Link to="/auth" className="signup-button">
            Sign up
          </Link>

          <IconButton className="menu-button" onClick={handleClickOpen}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Navigation */}
      <Dialog open={open} onClose={handleClose} className="nav-dialog">
        <DialogContent>
          <List>
            <ListItem button onClick={handleClose} component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <Divider className="nav-divider" />
            <ListItem button onClick={handleClose} component={Link} to="/features">
              <ListItemText primary="Features" />
            </ListItem>
            <Divider className="nav-divider" />
            <ListItem button onClick={handleClose} component={Link} to="/docs">
              <ListItemText primary="Docs" />
            </ListItem>
            <Divider className="nav-divider" />
            <ListItem button onClick={handleClose} component={Link} to="/auth">
              <ListItemText primary="Sign in" />
            </ListItem>
            <Divider className="nav-divider" />
            <ListItem button onClick={handleClose} component={Link} to="/auth/register">
              <ListItemText primary="Sign up" />
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