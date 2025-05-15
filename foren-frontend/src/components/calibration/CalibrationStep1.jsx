import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const CalibrationStep1 = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Device Setup
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
        <TextField 
          label="Equipment ID" 
          variant="outlined" 
          fullWidth 
        />
        
        <FormControl fullWidth>
          <InputLabel>Equipment Type</InputLabel>
          <Select label="Equipment Type">
            <MenuItem value="scanner">3D Scanner</MenuItem>
            <MenuItem value="camera">Forensic Camera</MenuItem>
            <MenuItem value="spectrometer">Spectrometer</MenuItem>
          </Select>
        </FormControl>
        
        <TextField 
          label="Manufacturer" 
          variant="outlined" 
          fullWidth 
        />
      </Box>
    </Box>
  );
};