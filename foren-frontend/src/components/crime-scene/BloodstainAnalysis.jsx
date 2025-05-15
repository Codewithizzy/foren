import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { Straighten, Calculate, Science } from '@mui/icons-material';

export const BloodstainAnalysis = () => {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Bloodstain Pattern Analysis
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #eee', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Straighten sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Impact Angle</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Calculate the angle of impact based on stain shape
            </Typography>
            <Button variant="outlined" startIcon={<Calculate />}>
              Calculate
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #eee', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Science sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Blood Origin</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Determine point of origin using multiple stains
            </Typography>
            <Button variant="outlined" startIcon={<Calculate />}>
              Calculate
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #eee', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Straighten sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Trajectory Analysis</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Analyze blood spatter trajectories
            </Typography>
            <Button variant="outlined" startIcon={<Calculate />}>
              Analyze
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};