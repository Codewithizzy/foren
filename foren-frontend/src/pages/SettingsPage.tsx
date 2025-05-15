import { Box, Typography, Tabs, Tab, Switch, FormControlLabel } from '@mui/material';
import { useState } from 'react';

export const SettingsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      
      <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
        <Tab label="Preferences" />
        <Tab label="Notifications" />
        <Tab label="Integrations" />
      </Tabs>
      
      {tabIndex === 0 && (
        <Box sx={{ mt: 3 }}>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
            label="Dark Mode"
          />
        </Box>
      )}
      
      {tabIndex === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography>Notification settings coming soon</Typography>
        </Box>
      )}
      
      {tabIndex === 2 && (
        <Box sx={{ mt: 3 }}>
          <Typography>Integration settings coming soon</Typography>
        </Box>
      )}
    </Box>
  );
};