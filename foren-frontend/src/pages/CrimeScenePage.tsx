import { Box, Grid, Typography } from '@mui/material';
import { SceneUpload, SceneReconstruction, BloodstainAnalysis } from '../components/crime-scene';

export const CrimeScenePage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Crime Scene Analysis
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SceneUpload />
        </Grid>
        <Grid item xs={12} md={6}>
          <SceneReconstruction />
        </Grid>
        <Grid item xs={12}>
          <BloodstainAnalysis />
        </Grid>
      </Grid>
    </Box>
  );
};