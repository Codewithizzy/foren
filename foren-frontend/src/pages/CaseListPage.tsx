import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Case ID', width: 120 },
  { field: 'title', headerName: 'Case Title', width: 250 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'created', headerName: 'Created', width: 150 },
  { field: 'assignedTo', headerName: 'Assigned To', width: 180 },
];

const cases = [
  { id: 'C-2023-001', title: 'Bank Robbery - Main Street', status: 'Active', created: '2023-05-15', assignedTo: 'John Doe' },
  // More cases...
];

export const CaseListPage = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Case Management</Typography>
        <Button variant="contained" startIcon={<Add />}>
          New Case
        </Button>
      </Box>
      
      <Paper sx={{ height: 600, p: 1 }}>
        <DataGrid
          rows={cases}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </Paper>
    </Box>
  );
};