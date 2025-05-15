import { Box, Typography, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import { Folder } from '@mui/icons-material';

export const RecentCases = () => {
  const cases = [
    { id: 'C-2023-015', title: 'Bank Robbery', status: 'Active', modified: '2 hours ago' },
    { id: 'C-2023-014', title: 'Burglary', status: 'Pending', modified: '1 day ago' },
    { id: 'C-2023-013', title: 'Cyber Crime', status: 'Active', modified: '2 days ago' },
  ];

  return (
    <Box>
      <List>
        {cases.map((caseItem) => (
          <Box key={caseItem.id}>
            <ListItem>
              <Folder sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText
                primary={caseItem.title}
                secondary={`Case ID: ${caseItem.id} • Modified: ${caseItem.modified}`}
              />
              <Chip 
                label={caseItem.status} 
                color={caseItem.status === 'Active' ? 'primary' : 'default'} 
                size="small" 
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};