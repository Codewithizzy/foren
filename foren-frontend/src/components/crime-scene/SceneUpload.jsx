import { Box, Typography, Button, Paper, LinearProgress } from '@mui/material';
import { CloudUpload, PhotoCamera } from '@mui/icons-material';
import { useState } from 'react';

export const SceneUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setIsUploading(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return oldProgress + 10;
      });
    }, 300);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload Crime Scene Documentation
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, border: '2px dashed #aaa', borderRadius: 1 }}>
        <CloudUpload sx={{ fontSize: 50, color: 'text.secondary', mb: 1 }} />
        <Typography gutterBottom>Drag & drop files here or</Typography>
        <Button 
          variant="contained" 
          component="label"
          startIcon={<PhotoCamera />}
          disabled={isUploading}
        >
          Select Files
          <input type="file" hidden multiple />
        </Button>
      </Box>
      
      {isUploading && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Uploading files...
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          onClick={handleUpload}
          disabled={isUploading}
        >
          Process Scene Data
        </Button>
      </Box>
    </Paper>
  );
};