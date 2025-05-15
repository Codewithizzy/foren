import { Box, Typography, Slider, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';

export const CalibrationStep2 = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [accuracy, setAccuracy] = useState(80);

  const runTest = () => {
    setIsTesting(true);
    setTimeout(() => setIsTesting(false), 2000);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Calibration Test
      </Typography>
      
      <Box sx={{ maxWidth: 500 }}>
        <Typography gutterBottom>Test Accuracy: {accuracy}%</Typography>
        <Slider 
          value={accuracy} 
          onChange={(e, val) => setAccuracy(val as number)} 
          min={0} 
          max={100} 
        />
        
        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            onClick={runTest}
            disabled={isTesting}
            startIcon={isTesting ? <CircularProgress size={20} /> : null}
          >
            {isTesting ? 'Testing...' : 'Run Diagnostic Test'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};