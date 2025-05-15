import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Search, Add } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'brand', headerName: 'Brand', width: 150 },
  { field: 'model', headerName: 'Model', width: 150 },
  { field: 'size', headerName: 'Size', width: 80 },
  { field: 'pattern', headerName: 'Pattern Type', width: 150 },
  { field: 'cases', headerName: 'Cases', width: 100 },
];

const footwearData = [
  { id: 1, brand: 'Nike', model: 'Air Force 1', size: 10, pattern: 'Herringbone', cases: 12 },
  { id: 2, brand: 'Adidas', model: 'Superstar', size: 9, pattern: 'Shell', cases: 8 },
  { id: 3, brand: 'Timberland', model: 'Premium', size: 11, pattern: 'Lug', cases: 5 },
];

export const FootwearDatabase = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mb: 2,
        gap: 2
      }}>
        <TextField
          placeholder="Search footwear..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />
          }}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" startIcon={<Add />}>
          Add to Database
        </Button>
      </Box>
      
      <DataGrid
        rows={footwearData}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
};