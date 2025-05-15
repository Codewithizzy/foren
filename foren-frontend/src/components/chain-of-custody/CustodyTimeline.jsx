import { Box, Typography, Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, Chip } from '@mui/material';
import { VerifiedUser, TransferWithinAStation, Storage } from '@mui/icons-material';

export const CustodyTimeline = () => {
  // Mock data - replace with API call
  const custodyEvents = [
    { 
      id: 1,
      timestamp: '2023-05-15 10:30',
      action: 'Evidence Collected',
      handler: 'Officer Smith',
      location: 'Crime Scene',
      verified: true
    },
    { 
      id: 2,
      timestamp: '2023-05-15 14:45',
      action: 'Transferred to Lab',
      handler: 'Detective Johnson',
      location: 'Forensic Lab A',
      verified: true
    },
    { 
      id: 3,
      timestamp: '2023-05-16 09:15',
      action: 'Analysis Started',
      handler: 'Tech Rodriguez',
      location: 'Lab Station 3',
      verified: false
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Chain of Custody Timeline
      </Typography>
      
      <Timeline>
        {custodyEvents.map((event) => (
          <TimelineItem key={event.id}>
            <TimelineSeparator>
              <TimelineDot color={event.verified ? 'primary' : 'grey'}>
                {event.action.includes('Transferred') ? 
                  <TransferWithinAStation /> : 
                  event.action.includes('Analysis') ? 
                  <Storage /> : 
                  <VerifiedUser />}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle2">{event.action}</Typography>
                {event.verified && <Chip label="Blockchain Verified" size="small" color="success" />}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {event.timestamp}
              </Typography>
              <Typography variant="body2">
                Handler: {event.handler} | Location: {event.location}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};