import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const TimeAgo: React.FC<{ timestamp: string }> = ({ timestamp }) => {
  return <span>{dayjs(timestamp).fromNow()}</span>;
};

export default TimeAgo;
