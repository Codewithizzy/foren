import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Button } from '@mui/material';
import { Person, Fingerprint, Warning } from '@mui/icons-material';

export const SuspectsPanel = ({ caseId }: { caseId: string }) => {
  // Mock data - replace with API call
  const suspects = [
    { id: 1, name: 'John Doe', status: 'Person of Interest', match: '85% footwear match' },
    { id: 2, name: 'Jane Smith', status: 'Witness', match: 'No direct evidence' },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Suspects & Persons of Interest
      </Typography>
      
      <List>
        {suspects.map((suspect) => (
          <Box key={suspect.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={suspect.name}
                secondary={
                  <>
                    <Box component="span" display="block">{suspect.status}</Box>
                    <Box component="span" display="block">{suspect.match}</Box>
                  </>
                }
              />
              <Button size="small" variant="outlined">View Profile</Button>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
      
      <Button variant="contained" sx={{ mt: 2 }} startIcon={<Person />}>
        Add New Suspect
      </Button>
    </Box>
  );
};