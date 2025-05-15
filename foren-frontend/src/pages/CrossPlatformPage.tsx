import { Box, Typography, Tabs, Tab, Paper, Grid } from '@mui/material';
import { NetworkGraph, CommunicationTimeline, EntityTable } from '../components/cross-platform';
import { useState } from 'react';

export const CrossPlatformPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Cross-Platform Correlation
      </Typography>

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="Network Graph" />
        <Tab label="Timeline" />
        <Tab label="Entity Analysis" />
      </Tabs>

      {activeTab === 0 && (
        <Paper sx={{ p: 2, mt: 2, height: '600px' }}>
          <NetworkGraph />
        </Paper>
      )}

      {activeTab === 1 && (
        <Box sx={{ mt: 2 }}>
          <CommunicationTimeline />
        </Box>
      )}

      {activeTab === 2 && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Suspect Communications
              </Typography>
              <EntityTable type="communications" />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Device Correlations
              </Typography>
              <EntityTable type="devices" />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};