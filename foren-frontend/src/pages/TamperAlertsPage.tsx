import { Box, Typography, Alert, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Warning, Security, History } from '@mui/icons-material';
import { TimeAgo } from '../components/common';

export const TamperAlertsPage = () => {
  // Mock data - replace with API call
  const alerts = [
    { 
      id: 1,
      type: 'Evidence Modified',
      message: 'Blood sample container was opened without authorization',
      timestamp: new Date(Date.now() - 3600000),
      severity: 'high'
    },
    { 
      id: 2,
      type: 'Chain of Custody Break',
      message: 'Gap detected in evidence transfer logs',
      timestamp: new Date(Date.now() - 86400000),
      severity: 'medium'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tamper Alerts
      </Typography>

      <Alert severity="error" sx={{ mb: 3 }}>
        Active alerts indicate potential integrity issues with evidence. All alerts are logged on the blockchain.
      </Alert>

      <List>
        {alerts.map((alert) => (
          <ListItem key={alert.id} sx={{ 
            borderLeft: 4, 
            borderColor: alert.severity === 'high' ? 'error.main' : 'warning.main',
            mb: 1
          }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: alert.severity === 'high' ? 'error.main' : 'warning.main' }}>
                <Security />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={alert.type}
              secondary={
                <>
                  {alert.message}
                  <Box component="span" display="block">
                    <TimeAgo date={alert.timestamp} />
                  </Box>
                </>
              }
            />
            <Warning color={alert.severity === 'high' ? 'error' : 'warning'} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};