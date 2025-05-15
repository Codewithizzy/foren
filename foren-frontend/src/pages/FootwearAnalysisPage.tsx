import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { FootwearUpload, FootwearDatabase, FootwearComparison } from '../components/footwear';

function TabPanel(props: { children: React.ReactNode; value: number; index: number }) {
  return (
    <div hidden={props.value !== props.index}>
      {props.value === props.index && <Box sx={{ p: 3 }}>{props.children}</Box>}
    </div>
  );
}

export const FootwearAnalysisPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Footwear Analysis
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Upload Evidence" />
          <Tab label="Footwear Database" />
          <Tab label="Comparison Tool" />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <FootwearUpload />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FootwearDatabase />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FootwearComparison />
      </TabPanel>
    </Box>
  );
};