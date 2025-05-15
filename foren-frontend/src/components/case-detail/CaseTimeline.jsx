import { Box, Typography, Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/material';
import { Event, CheckCircle, Warning } from '@mui/icons-material';

export const CaseTimeline = ({ caseId }: { caseId: string }) => {
  // Mock data - replace with API call
  const timelineEvents = [
    { 
      id: 1,
      date: '2023-05-15 09:30',
      event: 'Case Opened',
      icon: <Event color="primary" />,
      description: 'Initial report received from Officer Smith'
    },
    { 
      id: 2,
      date: '2023-05-15 11:45',
      event: 'Evidence Collected',
      icon: <CheckCircle color="success" />,
      description: 'Footwear impressions and DNA samples collected'
    },
    { 
      id: 3,
      date: '2023-05-16 14:20',
      event: 'Tamper Alert',
      icon: <Warning color="warning" />,
      description: 'Unauthorized access to evidence locker detected'
    }
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Case Timeline
      </Typography>
      
      <Timeline>
        {timelineEvents.map((item) => (
          <TimelineItem key={item.id}>
            <TimelineSeparator>
              <TimelineDot color="primary">
                {item.icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2">{item.event}</Typography>
              <Typography variant="caption" color="text.secondary">
                {item.date}
              </Typography>
              <Typography variant="body2">{item.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};