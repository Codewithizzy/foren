import { Box, Typography } from '@mui/material';
import { MessageUpload, LinguisticAnalysis, DeepfakeDetection } from '../components/message-analysis';

export const MessageAnalysisPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Message Analysis
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <MessageUpload />
      </Box>
      
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <LinguisticAnalysis />
        </Box>
        <Box sx={{ flex: 1 }}>
          <DeepfakeDetection />
        </Box>
      </Box>
    </Box>
  );
};