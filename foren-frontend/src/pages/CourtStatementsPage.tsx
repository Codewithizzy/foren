import { Box, Typography, Button } from '@mui/material';
import { Description } from '@mui/icons-material';
import { StatementGenerator, StatementTemplates } from '../components/court';

export const CourtStatementsPage = () => {
  const [generating, setGenerating] = useState(false);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Court Statements
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<Description />}
          onClick={() => setGenerating(true)}
        >
          Generate New Statement
        </Button>
      </Box>
      
      {generating ? (
        <StatementGenerator onComplete={() => setGenerating(false)} />
      ) : (
        <StatementTemplates />
      )}
    </Box>
  );
};