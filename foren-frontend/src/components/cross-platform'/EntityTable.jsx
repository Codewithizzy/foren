import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

export const EntityTable = ({ type }: { type: 'communications' | 'devices' }) => {
  const columns: GridColDef[] = type === 'communications' ? [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'from', headerName: 'From', width: 150 },
    { field: 'to', headerName: 'To', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'content', headerName: 'Content', width: 300 },
  ] : [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'type', headerName: 'Device Type', width: 150 },
    { field: 'identifier', headerName: 'Identifier', width: 200 },
    { field: 'owner', headerName: 'Owner', width: 150 },
    { field: 'lastSeen', headerName: 'Last Seen', width: 150 },
  ];

  const rows = type === 'communications' ? [
    { id: 1, type: 'Email', from: 'john@example.com', to: 'jane@example.com', date: '2023-05-10', content: 'Meeting at the bank' },
    { id: 2, type: 'Call', from: '555-1234', to: '555-5678', date: '2023-05-12', content: '2 minute call' },
  ] : [
    { id: 1, type: 'iPhone 12', identifier: 'IMEI: 123456789', owner: 'John Doe', lastSeen: '2023-05-14' },
    { id: 2, type: 'Android', identifier: 'IMEI: 987654321', owner: 'Jane Smith', lastSeen: '2023-05-13' },
  ];

  return (
    <Box sx={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};