import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, TextField, Snackbar, Alert } from '@mui/material';
import { Straighten, Calculate, Science } from '@mui/icons-material';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';


const BloodstainAnalysis: React.FC = () => {
  const [impactAngle, setImpactAngle] = useState<number | string>(''); // Impact Angle Calculation
  const [origin, setOrigin] = useState<string>(''); // Blood Origin Calculation
  const [trajectory, setTrajectory] = useState<string>(''); // Trajectory Analysis
  const [error, setError] = useState<string | null>(null); // Error state for validation
  const [calculatedImpactAngle, setCalculatedImpactAngle] = useState<number | null>(null); // Calculated Impact Angle
  const [calculatedOrigin, setCalculatedOrigin] = useState<{ x: number; y: number } | null>(null); // Calculated Origin
  const [calculatedTrajectory, setCalculatedTrajectory] = useState<string | null>(null); // Calculated Trajectory

  // Handle impact angle calculation
  const handleImpactAngle = () => {
    if (impactAngle === '' || isNaN(Number(impactAngle))) {
      setError('Please enter valid stain width and length data for impact angle calculation.');
      return;
    }
    
    const [width, length] = impactAngle.split(',').map((val) => parseFloat(val.trim()));
    if (width <= 0 || length <= 0) {
      setError('Stain width and length must be positive values.');
      return;
    }
    
    const angle = Math.asin(width / length) * (180 / Math.PI); // Impact angle calculation
    setCalculatedImpactAngle(angle);
    setError(null); // Clear any previous errors
  };

  // Handle blood origin calculation
  const handleBloodOrigin = () => {
    if (origin === '') {
      setError('Please provide points or stains for blood origin calculation.');
      return;
    }
    
    // Simulated origin calculation (you would use a more advanced method in reality)
    const [x1, y1, x2, y2] = origin.split(',').map((val) => parseFloat(val.trim()));
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
      setError('Please enter valid coordinates for stains.');
      return;
    }

    // Calculate the midpoint as a simple placeholder for origin
    const originX = (x1 + x2) / 2;
    const originY = (y1 + y2) / 2;

    setCalculatedOrigin({ x: originX, y: originY });
    setError(null); // Clear any previous errors
  };

  // Handle trajectory analysis
  const handleTrajectoryAnalysis = () => {
    if (trajectory === '') {
      setError('Please provide data or coordinates for trajectory analysis.');
      return;
    }

    // Simple trajectory analysis based on angle (mock-up)
    const [angle, distance] = trajectory.split(',').map((val) => parseFloat(val.trim()));
    if (isNaN(angle) || isNaN(distance)) {
      setError('Please enter valid angle and distance for trajectory analysis.');
      return;
    }

    // Simulate trajectory calculation: using trigonometry to estimate final position
    const radians = angle * (Math.PI / 180); // Convert to radians
    const x = distance * Math.cos(radians); // Calculate x position
    const y = distance * Math.sin(radians); // Calculate y position

    setCalculatedTrajectory(`Final Position: X = ${x.toFixed(2)}, Y = ${y.toFixed(2)}`);
    setError(null); // Clear any previous errors
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Bloodstain Pattern Analysis
      </Typography>

      <Grid container spacing={2}>
        {/* Impact Angle */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #eee', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Straighten sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Impact Angle</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Calculate the angle of impact based on stain shape (Enter width and length separated by comma)
            </Typography>
            <TextField
              label="Stain Width, Length"
              variant="outlined"
              fullWidth
              value={impactAngle}
              onChange={(e) => setImpactAngle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" startIcon={<Calculate />} onClick={handleImpactAngle}>
              Calculate
            </Button>
            {calculatedImpactAngle !== null && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                Calculated Impact Angle: {calculatedImpactAngle.toFixed(2)}°
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Blood Origin */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #eee', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Science sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Blood Origin</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Determine point of origin using multiple stains (Enter 2 points, separated by commas: x1, y1, x2, y2)
            </Typography>
            <TextField
              label="Point 1 (x1, y1), Point 2 (x2, y2)"
              variant="outlined"
              fullWidth
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" startIcon={<Calculate />} onClick={handleBloodOrigin}>
              Calculate
            </Button>
            {calculatedOrigin && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                Calculated Origin: X = {calculatedOrigin.x.toFixed(2)}, Y = {calculatedOrigin.y.toFixed(2)}
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Trajectory Analysis */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #eee', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Straighten sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Trajectory Analysis</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Analyze blood spatter trajectories (Enter angle and distance separated by comma)
            </Typography>
            <TextField
              label="Angle (degrees), Distance (m)"
              variant="outlined"
              fullWidth
              value={trajectory}
              onChange={(e) => setTrajectory(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" startIcon={<Calculate />} onClick={handleTrajectoryAnalysis}>
              Analyze
            </Button>
            {calculatedTrajectory && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                {calculatedTrajectory}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Error Snackbar */}
      <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default BloodstainAnalysis;
