import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { CustodyTimeline, TransferRequestForm } from '../components/chain-of-custody';

export const ChainOfCustodyPage = () => {
  const [showTransferForm, setShowTransferForm] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Chain of Custody</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setShowTransferForm(true)}
        >
          New Transfer
        </Button>
      </Box>
      
      {showTransferForm ? (
        <TransferRequestForm onCancel={() => setShowTransferForm(false)} />
      ) : (
        <CustodyTimeline />
      )}
    </Box>
  );
};