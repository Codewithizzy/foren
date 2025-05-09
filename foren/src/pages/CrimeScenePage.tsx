import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import SceneUpload from '../components/SceneUpload';
import SceneReconstruction from '../components/SceneReconstruction';
import BloodstainAnalysis from '../components/BloodstainAnalysis';

const CrimeScenePage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Crime Scene Analysis
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Crime Scene Tabs">
        <Tab label="Upload Scene" />
        <Tab label="Reconstruction" />
        <Tab label="Bloodstain Analysis" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && <SceneUpload />}
        {tabIndex === 1 && <SceneReconstruction />}
        {tabIndex === 2 && <BloodstainAnalysis />}
      </Box>
    </Box>
  );
};

export default CrimeScenePage;
