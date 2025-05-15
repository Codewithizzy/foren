import { Box, Typography, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';

export const CalibrationStep3 = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Calibration Validation
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Verify all test results before completing calibration
      </Alert>
      
      <Box>
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked} 
              onChange={(e) => setChecked(e.target.checked)} 
            />
          }
          label="I confirm the equipment is properly calibrated and test results are within acceptable parameters"
        />
      </Box>
    </Box>
  );
};