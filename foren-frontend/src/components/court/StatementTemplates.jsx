import { Box, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import { Description } from '@mui/icons-material';

export const StatementTemplates = () => {
  const templates = [
    { id: 1, title: 'Standard Footwear Analysis', description: 'Template for footwear impression matches' },
    { id: 2, title: 'DNA Evidence Summary', description: 'Template for DNA analysis results' },
    { id: 3, title: 'Digital Evidence Report', description: 'Template for digital forensic findings' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Statement Templates
      </Typography>
      
      <List>
        {templates.map((template) => (
          <Box key={template.id}>
            <ListItem>
              <ListItemText
                primary={template.title}
                secondary={template.description}
              />
              <Button size="small" startIcon={<Description />}>
                Use Template
              </Button>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};