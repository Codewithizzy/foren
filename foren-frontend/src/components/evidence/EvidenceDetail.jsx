import { Box, Typography, Paper, Grid, Button, Divider, Chip } from '@mui/material';
import { Fingerprint, Science, PhotoCamera, Description } from '@mui/icons-material';

export const EvidenceDetail = () => {
  // Mock data - replace with API call
  const evidence = {
    id: 'E-001',
    type: 'Footwear Impression',
    caseId: 'C-2023-015',
    collected: '2023-05-15 10:30',
    collectedBy: 'Officer Smith',
    location: 'Bank entrance',
    status: 'Analyzed',
    notes: 'Size 10, distinct wear pattern on right heel'
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Evidence Details: {evidence.id}
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Basic Information
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography><strong>Type:</strong> {evidence.type}</Typography>
              <Typography><strong>Case ID:</strong> {evidence.caseId}</Typography>
              <Typography><strong>Collected:</strong> {evidence.collected}</Typography>
              <Typography><strong>Collected By:</strong> {evidence.collectedBy}</Typography>
              <Typography><strong>Location Found:</strong> {evidence.location}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <strong>Status:</strong> 
                <Chip 
                  label={evidence.status} 
                  color={evidence.status === 'Analyzed' ? 'success' : 'primary'} 
                  size="small" 
                  sx={{ ml: 1 }} 
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Analysis Notes
            </Typography>
            <Typography>{evidence.notes}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Evidence Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<Fingerprint />}>
                View Analysis
              </Button>
              <Button variant="outlined" startIcon={<Science />}>
                Request Test
              </Button>
              <Button variant="outlined" startIcon={<PhotoCamera />}>
                View Photos
              </Button>
              <Button variant="outlined" startIcon={<Description />}>
                Generate Report
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};