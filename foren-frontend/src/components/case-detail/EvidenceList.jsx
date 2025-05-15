import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Evidence ID', width: 120 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'collected', headerName: 'Collected', width: 150 },
  { field: 'location', headerName: 'Location Found', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
];

export const EvidenceList = ({ caseId }: { caseId: string }) => {
  // Mock data - replace with API call
  const evidence = [
    { id: 'E-001', type: 'Footwear', collected: '2023-05-15', location: 'Main entrance', status: 'Analyzed' },
    { id: 'E-002', type: 'DNA Sample', collected: '2023-05-15', location: 'Counter surface', status: 'Pending' },
    { id: 'E-003', type: 'Fingerprint', collected: '2023-05-16', location: 'Back door', status: 'Processed' },
  ];

  return (
    <Box sx={{ height: 400, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Evidence Collected (Case {caseId})
      </Typography>
      <DataGrid
        rows={evidence}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};