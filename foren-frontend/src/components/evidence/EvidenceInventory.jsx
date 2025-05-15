import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Evidence ID', width: 120 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'caseId', headerName: 'Case ID', width: 120 },
  { field: 'location', headerName: 'Location', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'lastUpdated', headerName: 'Last Updated', width: 150 },
];

const evidence = [
  { id: 'E-001', type: 'Footwear', caseId: 'C-2023-015', location: 'Lab A', status: 'Analyzed', lastUpdated: '2023-05-15' },
  { id: 'E-002', type: 'DNA', caseId: 'C-2023-015', location: 'Lab B', status: 'Processing', lastUpdated: '2023-05-16' },
  { id: 'E-003', type: 'Fingerprint', caseId: 'C-2023-014', location: 'Storage', status: 'Archived', lastUpdated: '2023-05-10' },
];

export const EvidenceInventory = () => {
  return (
    <Box sx={{ height: 500 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">Evidence Inventory</Typography>
        <Button variant="contained" startIcon={<Add />} size="small">
          Add Evidence
        </Button>
      </Box>
      <DataGrid
        rows={evidence}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
};