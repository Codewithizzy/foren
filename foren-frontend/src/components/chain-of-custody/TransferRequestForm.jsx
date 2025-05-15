import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { useState } from 'react';

export const TransferRequestForm = ({ onCancel }: { onCancel: () => void }) => {
  const [formData, setFormData] = useState({
    evidenceId: '',
    recipient: '',
    purpose: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        New Evidence Transfer Request
      </Typography>
      
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="evidenceId"
          label="Evidence ID"
          value={formData.evidenceId}
          onChange={handleChange}
          required
        />
        
        <FormControl fullWidth>
          <InputLabel>Recipient</InputLabel>
          <Select
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
          >
            <MenuItem value="lab-a">Forensic Lab A</MenuItem>
            <MenuItem value="lab-b">Forensic Lab B</MenuItem>
            <MenuItem value="court">Court Evidence</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          name="purpose"
          label="Purpose of Transfer"
          value={formData.purpose}
          onChange={handleChange}
          required
          multiline
          rows={2}
        />
        
        <TextField
          name="notes"
          label="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={3}
        />
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Submit Transfer Request
          </Button>
        </Box>
      </Box>
    </Box>
  );
};