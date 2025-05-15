import { Box, Typography, Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/material';
import { Fingerprint, Email, Science } from '@mui/icons-material';

export const ActivityTimeline = () => {
  const activities = [
    { 
      id: 1,
      time: '10:30 AM',
      action: 'Footwear analysis completed',
      case: 'C-2023-015',
      icon: <Fingerprint />
    },
    { 
      id: 2,
      time: 'Yesterday',
      action: 'Message analysis report generated',
      case: 'C-2023-014',
      icon: <Email />
    },
    { 
      id: 3,
      time: 'May 14',
      action: 'DNA sample processed',
      case: 'C-2023-013',
      icon: <Science />
    }
  ];

  return (
    <Timeline>
      {activities.map((activity) => (
        <TimelineItem key={activity.id}>
          <TimelineSeparator>
            <TimelineDot>{activity.icon}</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2">{activity.action}</Typography>
            <Typography variant="caption" color="text.secondary">
              {activity.time} • {activity.case}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};