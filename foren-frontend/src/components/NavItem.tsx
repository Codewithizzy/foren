import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

export const NavItem = ({ to, icon, text }: NavItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={RouterLink} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};