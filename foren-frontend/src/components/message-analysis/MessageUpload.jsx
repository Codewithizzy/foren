import { Box, Typography, Grid, Paper, Slider, Button } from '@mui/material';
import { CompareArrows } from '@mui/icons-material';

export const FootwearComparison = () => {
  const [matchPercentage, setMatchPercentage] = useState(85);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Footwear Comparison Tool
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="subtitle1">Crime Scene Impression</Typography>
            <Box sx={{ 
              height: 300, 
              bgcolor: 'grey.100', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 2
            }}>
              <Typography color="text.secondary">Footwear Image</Typography>
            </Box>
            <Typography>Pattern: Herringbone | Size: ~10</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={2} sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <CompareArrows sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ my: 2 }}>
            {matchPercentage}% Match
          </Typography>
          <Slider
            value={matchPercentage}
            onChange={(e, val) => setMatchPercentage(val as number)}
            min={0}
            max={100}
            sx={{ width: 100 }}
          />
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="subtitle1">Suspect Footwear</Typography>
            <Box sx={{ 
              height: 300, 
              bgcolor: 'grey.100', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 2
            }}>
              <Typography color="text.secondary">Suspect Shoe Image</Typography>
            </Box>
            <Typography>Nike Air Force 1 | Size: 10</Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained">Save Comparison</Button>
        <Button variant="outlined">Generate Report</Button>
      </Box>
    </Box>
  );
};