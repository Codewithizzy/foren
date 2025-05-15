import { Box, Typography, Stepper, Step, StepLabel, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { CalibrationStep1, CalibrationStep2, CalibrationStep3 } from '../components/calibration';

const steps = ['Device Setup', 'Calibration Test', 'Validation'];

export const CalibrationPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setIsCalibrating(true);
      setTimeout(() => setIsCalibrating(false), 2000);
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Forensic Equipment Calibration
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isCalibrating ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography>Finalizing calibration...</Typography>
        </Box>
      ) : (
        <>
          {activeStep === 0 && <CalibrationStep1 />}
          {activeStep === 1 && <CalibrationStep2 />}
          {activeStep === 2 && <CalibrationStep3 />}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Complete Calibration' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};