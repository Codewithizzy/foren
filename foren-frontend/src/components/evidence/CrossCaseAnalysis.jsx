import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'caseId', headerName: 'Case ID', width: 120 },
  { field: 'similarity', headerName: 'Similarity', width: 100 },
  { field: 'evidenceType', headerName: 'Evidence Type', width: 150 },
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'location', headerName: 'Location', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
];

const similarCases = [
  { id: 1, caseId: 'C-2023-012', similarity: '87%', evidenceType: 'Footwear', date: '2023-04-28', location: '24 Main St', status: 'Closed' },
  { id: 2, caseId: 'C-2023-008', similarity: '76%', evidenceType: 'Fingerprint', date: '2023-04-15', location: '15 Oak Ave', status: 'Closed' },
];

export const CrossCaseAnalysis = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cross-Case Evidence Correlations
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          AI-Detected Similar Cases
        </Typography>
        <DataGrid
          rows={similarCases}
          columns={columns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Paper>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Similar Footwear Patterns
            </Typography>
            {/* Would include visual comparison components */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Matching DNA Profiles
            </Typography>
            {/* Would include DNA match visualization */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};