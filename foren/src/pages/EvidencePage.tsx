import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import EvidenceInventory from '../components/EvidenceInventory';
import EvidenceDetail from '../components/EvidenceDetail';
import CrossCaseAnalysis from '../components/CrossCaseAnalysis';
import FootwearComparison from '../components/FootwearComparison';

const EvidencePage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Evidence Management
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Evidence tabs">
        <Tab label="Inventory" />
        <Tab label="Details" />
        <Tab label="Footwear Comparison" />
        <Tab label="Cross-Case Analysis" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && <EvidenceInventory />}
        {tabIndex === 1 && <EvidenceDetail />}
        {tabIndex === 2 && <FootwearComparison />}
        {tabIndex === 3 && <CrossCaseAnalysis />}
      </Box>
    </Box>
  );
};

export default EvidencePage;
