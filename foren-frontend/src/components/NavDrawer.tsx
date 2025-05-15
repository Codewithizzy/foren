import { Drawer, List, Divider, Toolbar, Typography } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Fingerprint as FootwearIcon,
  CameraAlt as CrimeSceneIcon,
  Email as MessageIcon,
  Link as ChainIcon,
  Inventory as EvidenceIcon,
  Gavel as CourtIcon,
  Map as MapIcon,
  Person as SuspectIcon,
  Warning as AlertIcon,
  Security as SecurityIcon,
  Public as CrossPlatformIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
  Build as CalibrationIcon
} from '@mui/icons-material';
import { NavItem } from './NavItem';

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const NavDrawer = ({ open, onClose }: NavDrawerProps) => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box' 
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <NavItem to="/" icon={<DashboardIcon />} text="Dashboard" />
          
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
            Analysis Tools
          </Typography>
          <NavItem to="/footwear" icon={<FootwearIcon />} text="Footwear Analysis" />
          <NavItem to="/crime-scene" icon={<CrimeSceneIcon />} text="Crime Scene" />
          <NavItem to="/messages" icon={<MessageIcon />} text="Message Analysis" />
          <NavItem to="/cross-platform" icon={<CrossPlatformIcon />} text="Cross-Platform" />
          
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
            Evidence Management
          </Typography>
          <NavItem to="/chain-of-custody" icon={<ChainIcon />} text="Chain of Custody" />
          <NavItem to="/evidence" icon={<EvidenceIcon />} text="Evidence" />
          <NavItem to="/court-statements" icon={<CourtIcon />} text="Court Statements" />
          
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
            Investigative Tools
          </Typography>
          <NavItem to="/predictive-map" icon={<MapIcon />} text="Predictive Map" />
          <NavItem to="/suspects" icon={<SuspectIcon />} text="Suspect Profiler" />
          <NavItem to="/tamper-alerts" icon={<AlertIcon />} text="Tamper Alerts" />
          <NavItem to="/tampering-report" icon={<SecurityIcon />} text="Tampering Report" />
          <NavItem to="/calibration" icon={<CalibrationIcon />} text="Calibration" />
          
          <Divider sx={{ my: 1 }} />
          <NavItem to="/profile" icon={<ProfileIcon />} text="Profile" />
          <NavItem to="/settings" icon={<SettingsIcon />} text="Settings" />
        </List>
      </Box>
    </Drawer>
  );
};