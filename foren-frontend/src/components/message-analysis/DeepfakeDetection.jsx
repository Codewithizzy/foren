import { Box, Typography, Button, Paper, Tabs, Tab } from '@mui/material';
import { Upload, Email, Sms, Chat } from '@mui/icons-material';
import { useState } from 'react';

export const MessageUpload = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload Communications
      </Typography>
      
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab icon={<Email />} label="Emails" />
        <Tab icon={<Sms />} label="Text Messages" />
        <Tab icon={<Chat />} label="Social Media" />
      </Tabs>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: 3, 
        border: '2px dashed #aaa', 
        borderRadius: 1,
        mt: 2
      }}>
        <Upload sx={{ fontSize: 50, color: 'text.secondary', mb: 1 }} />
        <Typography gutterBottom>
          {tabValue === 0 && 'Upload email files (EML, PST)'}
          {tabValue === 1 && 'Upload SMS/MMS exports'}
          {tabValue === 2 && 'Upload social media data'}
        </Typography>
        <Button 
          variant="contained" 
          component="label"
          sx={{ mt: 2 }}
        >
          Select Files
          <input type="file" hidden multiple />
        </Button>
      </Box>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained">Analyze Messages</Button>
      </Box>
    </Paper>
  );
};