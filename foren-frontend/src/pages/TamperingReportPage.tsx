import { Box, Typography, Alert, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Warning, CheckCircle } from '@mui/icons-material';

export const TamperingReportPage = () => {
  // Mock data - replace with API results
  const analysisResults = [
    { id: 1, type: 'Metadata', result: 'Altered', description: 'EXIF data shows inconsistent timestamps' },
    { id: 2, type: 'Pixel Analysis', result: 'Clean', description: 'No signs of pixel-level manipulation' },
    { id: 3, type: 'Compression', result: 'Suspicious', description: 'Multiple compression artifacts detected' }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Digital Evidence Tampering Report
      </Typography>

      <Alert severity="warning" icon={<Warning />} sx={{ mb: 3 }}>
        This evidence shows signs of potential tampering. Proceed with caution.
      </Alert>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Analysis Results
      </Typography>

      <List>
        {analysisResults.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.type}
              secondary={item.description}
            />
            {item.result === 'Clean' ? (
              <CheckCircle color="success" />
            ) : (
              <Warning color={item.result === 'Suspicious' ? 'warning' : 'error'} />
            )}
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Forensic Conclusion
        </Typography>
        <Typography>
          The digital evidence shows multiple indicators of potential manipulation. 
          The metadata inconsistencies and compression artifacts suggest this file 
          may have been edited after initial creation.
        </Typography>
      </Box>
    </Box>
  );
};