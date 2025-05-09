import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const allCases = [
  { id: 1, caseId: 'C-2023-012', similarity: '87%', evidenceType: 'Footwear', date: '2023-04-28', location: '24 Main St', status: 'Closed' },
  { id: 2, caseId: 'C-2023-008', similarity: '76%', evidenceType: 'Fingerprint', date: '2023-04-15', location: '15 Oak Ave', status: 'Closed' },
  { id: 3, caseId: 'C-2023-020', similarity: '91%', evidenceType: 'DNA', date: '2023-05-01', location: '42 Pine St', status: 'Open' }
];

const columns: GridColDef[] = [
  {
    field: 'caseId',
    headerName: 'Case ID',
    width: 120,
    renderCell: (params) => {
      const navigate = useNavigate();
      return (
        <Button onClick={() => navigate(`/cases/${params.value}`)} variant="text">
          {params.value}
        </Button>
      );
    }
  },
  { field: 'similarity', headerName: 'Similarity', width: 100 },
  { field: 'evidenceType', headerName: 'Evidence Type', width: 150 },
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'location', headerName: 'Location', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 }
];

const footwearData = [
  { pattern: 'Tread A', matches: 3 },
  { pattern: 'Tread B', matches: 1 },
  { pattern: 'Tread C', matches: 2 }
];

const dnaData = [
  { profile: 'DNA-001', matchScore: 96 },
  { profile: 'DNA-002', matchScore: 87 },
  { profile: 'DNA-003', matchScore: 74 }
];

export const CrossCaseAnalysis: React.FC = () => {
  const [evidenceFilter, setEvidenceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCases = allCases.filter((c) => {
    return (
      (!evidenceFilter || c.evidenceType === evidenceFilter) &&
      (!statusFilter || c.status === statusFilter)
    );
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Cross-Case Evidence Correlations
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Evidence Type</InputLabel>
            <Select
              value={evidenceFilter}
              onChange={(e) => setEvidenceFilter(e.target.value)}
              label="Evidence Type"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Footwear">Footwear</MenuItem>
              <MenuItem value="Fingerprint">Fingerprint</MenuItem>
              <MenuItem value="DNA">DNA</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <DataGrid
          rows={filteredCases}
          columns={columns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              csvOptions: { fileName: 'similar-cases' },
            },
          }}
        />
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Similar Footwear Patterns
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={footwearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="pattern" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="matches" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Matching DNA Profiles
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dnaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profile" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="matchScore" fill="#9c27b0" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CrossCaseAnalysis;
