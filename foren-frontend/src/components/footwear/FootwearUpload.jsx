import { Box, Typography, Button, Paper, LinearProgress } from '@mui/material';
import { CloudUpload, CameraAlt } from '@mui/icons-material';
import { useState } from 'react';

export const FootwearUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setIsUploading(true);
    setProgress(0);
    
    // Simulate upload
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
        Upload Footwear Evidence
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: 3, 
        border: '2px dashed #aaa', 
        borderRadius: 1,
        mb: 2
      }}>
        <CloudUpload sx={{ fontSize: 50, color: 'text.secondary', mb: 1 }} />
        <Typography gutterBottom>Drag & drop photos or scans here</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Supported formats: JPG, PNG, TIFF, 3D scans
        </Typography>
        <Button 
          variant="contained" 
          component="label"
          startIcon={<CameraAlt />}
        >
          Select Files
          <input type="file" hidden multiple />
        </Button>
      </Box>
      
      {isUploading && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">Processing footwear impressions...</Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
      
      <Button 
        variant="contained" 
        fullWidth
        onClick={handleUpload}
        disabled={isUploading}
      >
        Analyze Footwear
      </Button>
    </Paper>
  );
};