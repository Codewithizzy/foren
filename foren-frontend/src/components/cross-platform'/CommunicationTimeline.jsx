import { Box, Typography, Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/material';
import { Email, Phone, Public } from '@mui/icons-material';

export const CommunicationTimeline = () => {
  const communications = [
    { 
      id: 1,
      date: '2023-05-10 14:30',
      type: 'email',
      from: 'john@example.com',
      to: 'jane@example.com',
      summary: 'Discussed meeting at the bank'
    },
    { 
      id: 2,
      date: '2023-05-12 09:15',
      type: 'call',
      from: '555-1234',
      to: '555-5678',
      summary: '2 minute call'
    },
    { 
      id: 3,
      date: '2023-05-14 18:45',
      type: 'social',
      from: 'john_anon',
      to: 'jane_anon',
      summary: 'Messaging about security'
    }
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'email': return <Email color="primary" />;
      case 'call': return <Phone color="secondary" />;
      default: return <Public color="action" />;
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Communication Timeline
      </Typography>
      
      <Timeline>
        {communications.map((comm) => (
          <TimelineItem key={comm.id}>
            <TimelineSeparator>
              <TimelineDot>
                {getIcon(comm.type)}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2">
                {comm.type.toUpperCase()}: {comm.from} → {comm.to}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {comm.date}
              </Typography>
              <Typography variant="body2">{comm.summary}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};