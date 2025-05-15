import { Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';

export const StatementGenerator = ({ onComplete }: { onComplete: () => void }) => {
  const [statement, setStatement] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateStatement = () => {
    setIsGenerating(true);
    setError('');
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setStatement(`Based on the forensic analysis conducted on May 15, 2023, the footwear impressions found at the crime scene show an 87% match with the suspect's shoes. The pattern and wear marks are consistent with the suspect's known footwear.`);
    }, 2000);
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Generate Court Statement
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={generateStatement}
          disabled={isGenerating}
          startIcon={isGenerating ? <CircularProgress size={20} /> : null}
        >
          {isGenerating ? 'Generating...' : 'Generate with AI'}
        </Button>
      </Box>
      
      <TextField
        fullWidth
        multiline
        rows={8}
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
        placeholder="AI-generated statement will appear here..."
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
        <Button variant="outlined" onClick={onComplete}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          disabled={!statement.trim()}
          onClick={onComplete}
        >
          Save Statement
        </Button>
      </Box>
    </Box>
  );
};