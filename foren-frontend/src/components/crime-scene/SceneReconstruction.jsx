import { Box, Typography, Slider, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useState } from 'react';

export const SceneReconstruction = () => {
  const [viewMode, setViewMode] = useState('overhead');
  const [zoom, setZoom] = useState(50);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Scene Reconstruction
      </Typography>
      
      <Box sx={{ 
        height: 300, 
        bgcolor: 'grey.100', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mb: 2
      }}>
        <Typography color="text.secondary">
          {viewMode === 'overhead' ? 'Overhead View' : '3D Reconstruction'} - Zoom: {zoom}%
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newValue) => setViewMode(newValue)}
          fullWidth
        >
          <ToggleButton value="overhead">Overhead View</ToggleButton>
          <ToggleButton value="3d">3D Reconstruction</ToggleButton>
        </ToggleButtonGroup>
        
        <Box>
          <Typography gutterBottom>Zoom Level</Typography>
          <Slider
            value={zoom}
            onChange={(e, val) => setZoom(val as number)}
            min={10}
            max={100}
          />
        </Box>
        
        <Button variant="outlined" fullWidth>
          Add Evidence Marker
        </Button>
      </Box>
    </Paper>
  );
};