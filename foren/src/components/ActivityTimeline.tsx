import React, { useState } from 'react';
import { Box, Typography, TextField, CircularProgress } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { Fingerprint, Email, Science, Search } from '@mui/icons-material';
import './ActivityTimeline.css'; // Import the CSS file

// Define types for the activity data
interface Activity {
  id: number;
  time: string;
  action: string;
  case: string;
  icon: JSX.Element;
  description: string;
}

interface ActivityTimelineProps {
  data: Activity[];
  loading: boolean;
  error: string | null;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ data, loading, error }) => {
  const [filteredData, setFilteredData] = useState<Activity[]>(data);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (activity) =>
            activity.action.toLowerCase().includes(e.target.value.toLowerCase()) ||
            activity.case.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const handleActivityClick = (activity: Activity) => {
    alert(`Activity details: ${activity.description}`);
  };

  return (
    <Box className="activity-timeline-container">
      <Typography variant="h4" gutterBottom className="timeline-title">
        Forensic Activity Timeline
      </Typography>

      {/* Search bar */}
      <Box className="timeline-search" mb={2}>
        <TextField
          label="Search Activities"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            endAdornment: <Search />,
          }}
        />
      </Box>

      {/* Error and loading states */}
      {loading ? (
        <Box className="timeline-loading">
          <CircularProgress />
          <Typography className="timeline-loading-text">Loading activities...</Typography>
        </Box>
      ) : error ? (
        <Box className="timeline-error">
          <Typography>{`Error: ${error}`}</Typography>
        </Box>
      ) : (
        <Timeline className="timeline">
          {filteredData.map((activity) => (
            <TimelineItem 
              key={activity.id} 
              className="timeline-item"
              onClick={() => handleActivityClick(activity)}
            >
              <TimelineSeparator>
                <TimelineDot className="timeline-dot">{activity.icon}</TimelineDot>
                <TimelineConnector className="timeline-connector" />
              </TimelineSeparator>
              <TimelineContent className="timeline-content">
                <Typography variant="subtitle2" className="timeline-action">{activity.action}</Typography>
                <Box className="timeline-meta">
                  <Typography variant="caption">{activity.time}</Typography>
                  <Typography variant="caption">•</Typography>
                  <Typography variant="caption">{activity.case}</Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}

      {/* Show message if no activities match the search */}
      {filteredData.length === 0 && searchQuery !== '' && !loading && !error && (
        <Box className="timeline-no-results">
          <Typography>No activities found matching your search criteria.</Typography>
        </Box>
      )}
    </Box>
  );
};

// Example of how to use ActivityTimeline with dynamic data
const exampleActivities: Activity[] = [
  { 
    id: 1,
    time: '10:30 AM',
    action: 'Footwear analysis completed',
    case: 'C-2023-015',
    icon: <Fingerprint />,
    description: 'Analysis of footwear impression collected from the crime scene was completed successfully.',
  },
  { 
    id: 2,
    time: 'Yesterday',
    action: 'Message analysis report generated',
    case: 'C-2023-014',
    icon: <Email />,
    description: 'The report based on email messages retrieved from the suspect\'s device has been generated.',
  },
  { 
    id: 3,
    time: 'May 14',
    action: 'DNA sample processed',
    case: 'C-2023-013',
    icon: <Science />,
    description: 'DNA sample collected from the crime scene has been processed and analyzed.',
  }
];

const App = () => {
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return (
    <div>
      <ActivityTimeline data={exampleActivities} loading={loading} error={error} />
    </div>
  );
};

export default App;