import { Box, Typography, Tabs, Tab, Chip, Divider, Button } from '@mui/material';
import { CaseTimeline, EvidenceList, SuspectsPanel } from '../components/case-detail';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const CaseDetailPage = () => {
  const { caseId } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  // Mock data - replace with API call
  const caseData = {
    id: caseId,
    title: "Bank Robbery - Main Street",
    status: "Active",
    created: "2023-05-15",
    assignedTo: "John Doe",
    description: "Armed robbery at First National Bank, suspect left footwear impressions at scene."
  };

  return (
    <Box>
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

      {activeTab === 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Case Summary</Typography>
          {/* Add summary components */}
        </Box>
      )}

      {activeTab === 1 && <EvidenceList caseId={caseId} />}
      {activeTab === 2 && <SuspectsPanel caseId={caseId} />}
      {activeTab === 3 && <CaseTimeline caseId={caseId} />}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained">Generate Report</Button>
        <Button variant="outlined">Edit Case Details</Button>
      </Box>
    </Box>
  );
};