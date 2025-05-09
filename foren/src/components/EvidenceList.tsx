import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, MenuItem, FormControl, Select, InputLabel, Button, Modal, Backdrop, Fade } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { SaveAlt } from '@mui/icons-material';
import { CSVLink } from 'react-csv';

// Define the structure for Evidence data
interface Evidence {
  id: string;
  type: string;
  collected: string;
  location: string;
  status: string;
  description: string;  // New field for detailed view
}

// Define columns for the DataGrid
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Evidence ID', width: 120, sortable: true },
  { field: 'type', headerName: 'Type', width: 150, sortable: true },
  { field: 'collected', headerName: 'Collected', width: 150, sortable: true },
  { field: 'location', headerName: 'Location Found', width: 200, sortable: true },
  { field: 'status', headerName: 'Status', width: 150, sortable: true },
];

export const EvidenceList = ({ caseId }: { caseId: string }) => {
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);

  // Fetch data for evidence (mock data for now)
  useEffect(() => {
    const fetchEvidence = async () => {
      setLoading(true);
      try {
        // Mock data - replace with API call
        const response = [
          { id: 'E-001', type: 'Footwear', collected: '2023-05-15', location: 'Main entrance', status: 'Analyzed', description: 'Footwear impressions left at the scene.' },
          { id: 'E-002', type: 'DNA Sample', collected: '2023-05-15', location: 'Counter surface', status: 'Pending', description: 'DNA sample collected from the counter.' },
          { id: 'E-003', type: 'Fingerprint', collected: '2023-05-16', location: 'Back door', status: 'Processed', description: 'Fingerprint lifted from the back door.' },
          { id: 'E-004', type: 'DNA Sample', collected: '2023-05-17', location: 'Main entrance', status: 'Pending', description: 'DNA sample collected from the entrance.' },
          { id: 'E-005', type: 'Footwear', collected: '2023-05-18', location: 'Parking lot', status: 'Analyzed', description: 'Footwear match found in the parking lot.' },
        ];
        setEvidence(response);
      } catch (error) {
        console.error('Error fetching evidence:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvidence();
  }, [caseId]);

  // Filter evidence by status and search by evidence ID
  const filteredEvidence = evidence.filter((item) => {
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle status filter change
  const handleStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as string);
  };

  // Handle search input change
  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Open modal when a row is clicked
  const handleRowClick = (params: GridRowParams) => {
    const selected = evidence.find((item) => item.id === params.row.id);
    setSelectedEvidence(selected || null);
    setModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEvidence(null);
  };

  // Export evidence data to CSV format
  const handleExportToCSV = () => {
    return filteredEvidence.map((item) => ({
      'Evidence ID': item.id,
      Type: item.type,
      Collected: item.collected,
      Location: item.location,
      Status: item.status,
      Description: item.description,
    }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Evidence Collected (Case {caseId})
      </Typography>

      {/* Search and Filter Options */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search Evidence ID"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          sx={{ width: '48%' }}
        />

        <FormControl variant="outlined" sx={{ width: '48%' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Status"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Analyzed">Analyzed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Processed">Processed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* DataGrid for displaying evidence */}
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={filteredEvidence}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}
          disableSelectionOnClick
          onRowClick={handleRowClick} // Row click handler
        />
      </Box>

      {/* Export to CSV Button */}
      <CSVLink data={handleExportToCSV()} filename={`evidence_case_${caseId}.csv`}>
        <Button variant="contained" sx={{ mt: 2 }} startIcon={<SaveAlt />}>
          Export to CSV
        </Button>
      </CSVLink>

      {/* Modal for Evidence Details */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 24, width: '400px'
          }}>
            {selectedEvidence && (
              <div>
                <Typography variant="h6">{selectedEvidence.id}</Typography>
                <Typography variant="body2"><strong>Type:</strong> {selectedEvidence.type}</Typography>
                <Typography variant="body2"><strong>Collected:</strong> {selectedEvidence.collected}</Typography>
                <Typography variant="body2"><strong>Location:</strong> {selectedEvidence.location}</Typography>
                <Typography variant="body2"><strong>Status:</strong> {selectedEvidence.status}</Typography>
                <Typography variant="body2"><strong>Description:</strong> {selectedEvidence.description}</Typography>
              </div>
            )}
            <Button onClick={handleModalClose} variant="outlined" sx={{ mt: 2 }}>Close</Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default EvidenceList;
