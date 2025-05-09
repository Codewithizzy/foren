import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Alert, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  CircularProgress,
  Paper,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  Save, 
  CheckCircle, 
  Warning,
  Task,
  VerifiedUser,
  History,
  Info,
  Error
} from '@mui/icons-material';

interface CalibrationStep3Props {
  onNext?: (data: { 
    isCalibrated: boolean;
    notes: string;
    calibrationDate: string;
  }) => void;
  onBack?: () => void;
  calibrationData?: {
    accuracy?: number;
    units?: string;
    scaleFactor?: number;
  };
}

const CalibrationStep3: React.FC<CalibrationStep3Props> = ({ 
  onNext, 
  onBack,
  calibrationData 
}) => {
  // State management
  const [checked, setChecked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [calibrationStatus, setCalibrationStatus] = useState<'Not Started' | 'In Progress' | 'Completed' | 'Failed'>('Not Started');
  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState('');
  const [calibrationDate] = useState(new Date().toISOString().split('T')[0]);

  // Finalize calibration
  const finalizeCalibration = () => {
    if (!checked) {
      setCalibrationStatus('Failed');
      return;
    }

    setIsSaving(true);
    setCalibrationStatus('In Progress');

    // Simulate API call
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }).then(() => {
      setIsSaving(false);
      setCalibrationStatus('Completed');
      setOpenDialog(true);
    });
  };

  // Handle dialog close
  const handleDialogClose = (proceed: boolean) => {
    setOpenDialog(false);
    if (proceed && onNext) {
      onNext({
        isCalibrated: true,
        notes,
        calibrationDate
      });
    }
  };

  // Status indicator component
  const StatusIndicator = ({ status }: { status: string }) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle color="success" sx={{ ml: 1, verticalAlign: 'bottom' }} />;
      case 'Failed':
        return <Error color="error" sx={{ ml: 1, verticalAlign: 'bottom' }} />;
      case 'In Progress':
        return <CircularProgress size={20} sx={{ ml: 1 }} />;
      default:
        return <Info color="info" sx={{ ml: 1, verticalAlign: 'bottom' }} />;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        <VerifiedUser color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
        Final Calibration Verification
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Please review all calibration parameters before finalizing.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            <Task sx={{ mr: 1, verticalAlign: 'middle' }} />
            Calibration Summary
          </Typography>

          <List dense sx={{ mb: 3 }}>
            <ListItem>
              <ListItemIcon>
                <History />
              </ListItemIcon>
              <ListItemText 
                primary="Calibration Date" 
                secondary={calibrationDate} 
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <VerifiedUser />
              </ListItemIcon>
              <ListItemText 
                primary="Status" 
                secondary={
                  <>
                    {calibrationStatus}
                    <StatusIndicator status={calibrationStatus} />
                  </>
                } 
              />
            </ListItem>
            {calibrationData && (
              <>
                <Divider component="li" />
                <ListItem>
                  <ListItemText 
                    primary="Accuracy" 
                    secondary={`${calibrationData.accuracy}%`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Measurement Units" 
                    secondary={calibrationData.units} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Scale Factor" 
                    secondary={calibrationData.scaleFactor} 
                  />
                </ListItem>
              </>
            )}
          </List>

          <TextField
            label="Calibration Notes"
            multiline
            rows={4}
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            helperText="Any additional notes about this calibration"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
            Verification
          </Typography>

          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  color={checked ? 'success' : 'default'}
                />
              }
              label={
                <Typography>
                  I verify that all calibration parameters are correct and the equipment is functioning properly.
                </Typography>
              }
              sx={{ alignItems: 'flex-start' }}
            />
          </Box>

          {calibrationStatus === 'In Progress' && (
            <Box sx={{ mb: 3 }}>
              <LinearProgress />
              <Typography variant="caption" display="block" textAlign="center">
                Finalizing calibration...
              </Typography>
            </Box>
          )}

          {calibrationStatus === 'Failed' && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Please confirm the verification checkbox before finalizing.
            </Alert>
          )}

          <Button
            variant="contained"
            onClick={finalizeCalibration}
            disabled={isSaving}
            startIcon={isSaving ? <CircularProgress size={20} /> : <Save />}
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            {isSaving ? 'Finalizing...' : 'Finalize Calibration'}
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={onBack}
          startIcon={<ArrowBack />}
          disabled={isSaving}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="success"
          endIcon={<ArrowForward />}
          disabled={calibrationStatus !== 'Completed'}
          onClick={() => setOpenDialog(true)}
        >
          Complete Process
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>
          <CheckCircle color="success" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Calibration Complete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The calibration process has been successfully completed. Would you like to proceed?
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Calibration Details:</Typography>
            <Typography variant="body2">
              Date: {calibrationDate}<br />
              Accuracy: {calibrationData?.accuracy}%<br />
              Status: Verified
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>Review</Button>
          <Button 
            onClick={() => handleDialogClose(true)} 
            variant="contained"
            startIcon={<CheckCircle />}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CalibrationStep3;