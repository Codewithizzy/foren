import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const timeUnits = [
  { unit: 'year', seconds: 31536000 },
  { unit: 'month', seconds: 2592000 },
  { unit: 'week', seconds: 604800 },
  { unit: 'day', seconds: 86400 },
  { unit: 'hour', seconds: 3600 },
  { unit: 'minute', seconds: 60 },
  { unit: 'second', seconds: 1 }
];

export const TimeAgo = ({ date }: { date: Date | string }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const parsedDate = typeof date === 'string' ? new Date(date) : date;
      const seconds = Math.floor((Date.now() - parsedDate.getTime()) / 1000);
      
      for (const { unit, seconds: unitSeconds } of timeUnits) {
        const interval = Math.floor(seconds / unitSeconds);
        if (interval >= 1) {
          setTimeAgo(`${interval} ${unit}${interval === 1 ? '' : 's'} ago`);
          return;
        }
      }
      setTimeAgo('just now');
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [date]);

  return <Typography variant="caption" color="text.secondary">{timeAgo}</Typography>;
};