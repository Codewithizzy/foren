import React, { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Button, CircularProgress } from '@mui/material';
import CalibrationStep1 from '../components/CalibrationStep1';
import CalibrationStep2 from '../components/CalibrationStep2';
import CalibrationStep3 from '../components/CalibrationStep3';
import './CalibrationPage.css'; // Import the CSS file

const steps = ['Device Setup', 'Calibration Test', 'Validation'];

const CalibrationPage: React.FC = () => {
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
    <Box className="calibration-container">
      <Typography variant="h4" gutterBottom className="calibration-title">
        Forensic Equipment Calibration
      </Typography>

      <Stepper activeStep={activeStep} className="calibration-stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isCalibrating ? (
        <Box className="calibration-progress">
          <CircularProgress size={60} className="progress-circle" />
          <Typography className="progress-text">Finalizing calibration...</Typography>
        </Box>
      ) : (
        <>
          {activeStep === 0 && <CalibrationStep1 />}
          {activeStep === 1 && <CalibrationStep2 />}
          {activeStep === 2 && <CalibrationStep3 />}

          <Box className="calibration-actions">
            {activeStep !== 0 && (
              <Button onClick={handleBack} className="back-button">
                Back
              </Button>
            )}
            <Button variant="contained" onClick={handleNext} className="next-button">
              {activeStep === steps.length - 1 ? 'Complete Calibration' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CalibrationPage;