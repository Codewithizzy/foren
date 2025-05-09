import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Tabs, Tab, Chip, Divider, Button, MenuItem, Select, InputLabel, FormControl, Modal, TextField, CircularProgress } from '@mui/material';
import CaseTimeline from '../components/CaseTimeline';
import EvidenceList from '../components/EvidenceList';
import SuspectsPanel from '../components/SuspectsPanel';

const CaseDetailPage: React.FC = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(caseId || '');
  const [casesData, setCasesData] = useState<any[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  // Mock data for cases
  const mockCases = [
    {
      id: 'C-001',
      title: 'Bank Robbery - Main Street',
      status: 'Active',
      created: '2023-05-15',
      assignedTo: 'John Doe',
      description: 'Armed robbery at First National Bank, suspect left footwear impressions at scene.',
    },
    {
      id: 'C-002',
      title: 'Stolen Vehicle - Highway 6',
      status: 'Closed',
      created: '2023-04-10',
      assignedTo: 'Jane Doe',
      description: 'Stolen vehicle recovered, suspects involved were identified from CCTV.',
    },
    // Add more mock cases here
  ];

  // Handle case data selection
  const handleCaseChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const caseId = event.target.value as string;
    setSelectedCaseId(caseId);
    navigate(`/cases/${caseId}`);  // Use navigate instead of history.push
  };

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      setCasesData(mockCases);
      setLoading(false);
    }, 1000); // Mocking a 1-second delay for the data fetching process
  }, []);

  // Get the case data for the selected case
  const caseData = casesData.find((item) => item.id === selectedCaseId);

  // If caseData is undefined or loading, show a loading spinner
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!caseData && !selectedCaseId) {
    return (
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">No case selected. Please select a case from the list below:</Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select Case</InputLabel>
          <Select value={selectedCaseId} label="Select Case" onChange={handleCaseChange}>
            {casesData.map((caseItem) => (
              <MenuItem key={caseItem.id} value={caseItem.id}>
                {caseItem.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

  // Filter cases based on search query
  const filteredCases = casesData.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open/Close Edit Case Details Modal
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  // Open/Close Change Status Modal
  const handleOpenStatusModal = () => setOpenStatusModal(true);
  const handleCloseStatusModal = () => setOpenStatusModal(false);

  return (
    <Box sx={{ p: 3 }}>
      {/* Case Selection Screen */}
      {selectedCaseId ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4">{caseData.title}</Typography>
            <Chip label={caseData.status} color="primary" />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">{caseData.description}</Typography>
            <Typography variant="caption" color="text.secondary">
              Case ID: {caseData.id} | Created: {caseData.created} | Assigned To: {caseData.assignedTo}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Overview" />
            <Tab label="Evidence" />
            <Tab label="Suspects" />
            <Tab label="Timeline" />
          </Tabs>

          <Box sx={{ mt: 3 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6">Case Summary</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Summary view for case-level insights and quick notes.
                </Typography>
              </Box>
            )}
            {activeTab === 1 && <EvidenceList caseId={selectedCaseId} />}
            {activeTab === 2 && <SuspectsPanel caseId={selectedCaseId} />}
            {activeTab === 3 && <CaseTimeline caseId={selectedCaseId} />}
          </Box>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={handleOpenEditModal}>Edit Case Details</Button>
            <Button variant="contained" color="secondary" onClick={handleOpenStatusModal}>Change Case Status</Button>
          </Box>

          {/* Modal for Editing Case Details */}
          <Modal open={openEditModal} onClose={handleCloseEditModal}>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, margin: 'auto', backgroundColor: 'white', width: 400 }}>
              <Typography variant="h6">Edit Case Details</Typography>
              <TextField
                label="Title"
                defaultValue={caseData.title}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                defaultValue={caseData.description}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleCloseEditModal}>Save Changes</Button>
            </Box>
          </Modal>

          {/* Modal for Changing Case Status */}
          <Modal open={openStatusModal} onClose={handleCloseStatusModal}>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, margin: 'auto', backgroundColor: 'white', width: 400 }}>
              <Typography variant="h6">Change Case Status</Typography>
              <TextField
                label="New Status"
                defaultValue={caseData.status}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleCloseStatusModal}>Save Status</Button>
            </Box>
          </Modal>
        </>
      ) : (
        // Case Selection Screen
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h6" color="error">No case selected. Please select a case from the list below:</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Case</InputLabel>
            <Select value={selectedCaseId} label="Select Case" onChange={handleCaseChange}>
              {filteredCases.map((caseItem) => (
                <MenuItem key={caseItem.id} value={caseItem.id}>
                  {caseItem.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default CaseDetailPage;
