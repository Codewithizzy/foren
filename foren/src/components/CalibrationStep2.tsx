import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Slider, 
  Button, 
  CircularProgress, 
  LinearProgress,
  Alert,
  Grid,
  Paper,
  InputAdornment,
  TextField,
  MenuItem // <-- Add this import
} from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  PlayArrow, 
  CheckCircle, 
  Warning,
  Straighten 
} from '@mui/icons-material';

interface CalibrationStep2Props {
  onNext?: (data: { accuracy: number; units: string; scaleFactor: number }) => void;
  onBack?: () => void;
  initialValues?: {
    accuracy?: number;
    units?: string;
    scaleFactor?: number;
  };
}

const CalibrationStep2: React.FC<CalibrationStep2Props> = ({ 
  onNext, 
  onBack,
  initialValues 
}) => {
  // State management
  const [isTesting, setIsTesting] = useState(false);
  const [accuracy, setAccuracy] = useState(initialValues?.accuracy || 80);
  const [progress, setProgress] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState(initialValues?.units || 'cm');
  const [scaleFactor, setScaleFactor] = useState(initialValues?.scaleFactor || 1.0);
  const [referenceLength, setReferenceLength] = useState(10);

  // Handle test completion
  useEffect(() => {
    if (progress === 100) {
      setTestComplete(true);
      setTimeout(() => setTestComplete(false), 3000);
    }
  }, [progress]);

  // Run the calibration test
  const runTest = () => {
    setError(null);
    
    if (accuracy < 50) {
      setError('Accuracy too low! Minimum 50% required for valid calibration.');
      return;
    }
    
    if (referenceLength <= 0) {
      setError('Reference length must be greater than zero');
      return;
    }

    setIsTesting(true);
    setProgress(0);

    // Simulate test progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTesting(false);
          return 100;
        }
        return newProgress;
      });
    }, 150);
  };

  // Handle next step
  const handleNext = () => {
    if (!testComplete && progress < 100) {
      setError('Please complete the calibration test before proceeding');
      return;
    }

    if (accuracy < 50) {
      setError('Minimum 50% accuracy required to proceed');
      return;
    }

    onNext?.({
      accuracy,
      units,
      scaleFactor
    });
  };

  // Calculate scaled reference length
  const scaledLength = referenceLength * scaleFactor;

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        <Straighten color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
        Scene Scale Calibration
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
        Define the physical scale of your scene by setting a reference measurement 
        and running the calibration test.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {testComplete && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Calibration test completed successfully with {accuracy}% accuracy
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Reference Measurement
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              label="Reference Length"
              type="number"
              fullWidth
              value={referenceLength}
              onChange={(e) => setReferenceLength(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{units}</InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              select
              label="Measurement Units"
              fullWidth
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            >
              <MenuItem value="cm">Centimeters</MenuItem>
              <MenuItem value="m">Meters</MenuItem>
              <MenuItem value="in">Inches</MenuItem>
              <MenuItem value="ft">Feet</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              label="Scale Factor"
              type="number"
              fullWidth
              value={scaleFactor}
              onChange={(e) => setScaleFactor(Number(e.target.value))}
              helperText="Multiplier for converting to scene units"
            />
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Scaled Length: {scaledLength.toFixed(2)} {units}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Calibration Test
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>
              Test Accuracy: {accuracy}%
              {accuracy < 50 && (
                <Warning color="warning" sx={{ ml: 1, verticalAlign: 'middle' }} />
              )}
            </Typography>
            <Slider
              value={accuracy}
              onChange={(e, val) => setAccuracy(val as number)}
              min={0}
              max={100}
              marks={[
                { value: 0, label: '0%' },
                { value: 50, label: '50%' },
                { value: 100, label: '100%' },
              ]}
            />
          </Box>

          {isTesting && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom>
                Calibration in progress...
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" display="block" textAlign="right">
                {progress}% complete
              </Typography>
            </Box>
          )}

          {progress === 100 && (
            <Alert icon={<CheckCircle fontSize="inherit" />} severity="success">
              Calibration complete! Accuracy: {accuracy}%
            </Alert>
          )}

          <Button
            variant="contained"
            onClick={runTest}
            disabled={isTesting}
            startIcon={isTesting ? <CircularProgress size={20} /> : <PlayArrow />}
            fullWidth
            sx={{ mt: 2 }}
          >
            {isTesting ? 'Calibrating...' : 'Run Calibration'}
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={onBack}
          startIcon={<ArrowBack />}
          disabled={isTesting}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          endIcon={<ArrowForward />}
          disabled={isTesting || progress < 100}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default CalibrationStep2;
