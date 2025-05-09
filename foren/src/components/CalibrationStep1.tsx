import React, { useState } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from '@mui/material';

interface CalibrationStep1Props {
  onNext?: (data: {
    equipmentId: string;
    equipmentType: string;
    manufacturer: string;
  }) => void;
  onBack?: () => void;
  initialValues?: {
    equipmentId?: string;
    equipmentType?: string;
    manufacturer?: string;
  };
}

const CalibrationStep1: React.FC<CalibrationStep1Props> = ({
  onNext,
  onBack,
  initialValues,
}) => {
  const [equipmentId, setEquipmentId] = useState(initialValues?.equipmentId || '');
  const [equipmentType, setEquipmentType] = useState(initialValues?.equipmentType || '');
  const [manufacturer, setManufacturer] = useState(initialValues?.manufacturer || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    equipmentId?: string;
    equipmentType?: string;
    manufacturer?: string;
  }>({});

  const handleSubmit = () => {
    setIsSubmitting(true);
    const newErrors = {
      equipmentId: !equipmentId ? 'Equipment ID is required' : undefined,
      equipmentType: !equipmentType ? 'Equipment Type is required' : undefined,
      manufacturer: !manufacturer ? 'Manufacturer is required' : undefined,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      onNext?.({
        equipmentId,
        equipmentType,
        manufacturer,
      });
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setEquipmentId('');
    setEquipmentType('');
    setManufacturer('');
    setErrors({});
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Calibration Step 1: Place reference object in the scene.
      </Typography>

      <Typography variant="body1" paragraph>
        Please provide the details of the equipment you're using for calibration.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
        <TextField
          label="Equipment ID"
          variant="outlined"
          fullWidth
          value={equipmentId}
          onChange={(e) => setEquipmentId(e.target.value)}
          error={!!errors.equipmentId}
          helperText={errors.equipmentId}
        />

        <FormControl fullWidth error={!!errors.equipmentType}>
          <InputLabel>Equipment Type</InputLabel>
          <Select
            value={equipmentType}
            label="Equipment Type"
            onChange={(e) => setEquipmentType(e.target.value)}
          >
            <MenuItem value="">Select a type</MenuItem>
            <MenuItem value="scanner">3D Scanner</MenuItem>
            <MenuItem value="camera">Forensic Camera</MenuItem>
            <MenuItem value="spectrometer">Spectrometer</MenuItem>
          </Select>
          {errors.equipmentType && (
            <FormHelperText>{errors.equipmentType}</FormHelperText>
          )}
        </FormControl>

        <TextField
          label="Manufacturer"
          variant="outlined"
          fullWidth
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          error={!!errors.manufacturer}
          helperText={errors.manufacturer}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onBack || handleReset}
          disabled={isSubmitting}
        >
          {onBack ? 'Back' : 'Reset'}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default CalibrationStep1;
