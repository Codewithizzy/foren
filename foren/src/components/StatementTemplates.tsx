import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  IconButton,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Description,
  Search,
  FilterList,
  Bookmark,
  BookmarkBorder
} from '@mui/icons-material';

interface Template {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  isFavorite?: boolean;
}

interface StatementTemplatesProps {
  onTemplateSelect: (content: string) => void;
}

const StatementTemplates: React.FC<StatementTemplatesProps> = ({ onTemplateSelect }) => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState<string | null>(null);
  const [templates, setTemplates] = React.useState<Template[]>([
    {
      id: 1,
      title: 'Standard Footwear Analysis',
      description: 'Template for footwear impression matches',
      content: 'The footwear impressions recovered from the scene exhibit class characteristics consistent with...',
      category: 'Forensic',
      isFavorite: true
    },
    {
      id: 2,
      title: 'DNA Evidence Summary',
      description: 'Template for DNA analysis results',
      content: 'DNA analysis conducted on the biological evidence recovered from the scene indicates...',
      category: 'Forensic'
    },
    {
      id: 3,
      title: 'Digital Evidence Report',
      description: 'Template for digital forensic findings',
      content: 'Examination of the digital devices revealed the following pertinent information...',
      category: 'Digital'
    },
    {
      id: 4,
      title: 'Basic Case Overview',
      description: 'Template for a general case overview',
      content: 'This case involves the investigation of [incident type] that occurred on [date] at [location]...',
      category: 'Administrative'
    },
    {
      id: 5,
      title: 'Suspect Interrogation Summary',
      description: 'Template for summarizing suspect interrogations',
      content: 'During the interview conducted on [date], the suspect [name] stated the following...',
      category: 'Investigative'
    },
    {
      id: 6,
      title: 'Evidence Analysis Report',
      description: 'Template for detailed analysis of physical evidence',
      content: 'The physical evidence collected from the scene was subjected to the following examinations...',
      category: 'Forensic'
    }
  ]);

  const categories = [...new Set(templates.map(t => t.category))];

  const toggleFavorite = (id: number) => {
    setTemplates(templates.map(template =>
      template.id === id ? { ...template, isFavorite: !template.isFavorite } : template
    ));
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? template.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterCategory(null);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Choose Template
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Choose a Template</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
              sx: { borderRadius: 2 }
            }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map(category => (
              <Chip
                key={category}
                label={category}
                onClick={() => setFilterCategory(filterCategory === category ? null : category)}
                color={filterCategory === category ? 'primary' : 'default'}
                variant={filterCategory === category ? 'filled' : 'outlined'}
              />
            ))}
            {(searchTerm || filterCategory) && (
              <Button size="small" onClick={handleClearFilters}>
                Clear filters
              </Button>
            )}
          </Box>

          <List sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <React.Fragment key={template.id}>
                  <ListItem
                    sx={{
                      p: 2,
                      mb: 1,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        transition: 'background-color 0.2s ease'
                      }
                    }}
                    secondaryAction={
                      <Button
                        size="medium"
                        startIcon={<Description />}
                        variant="contained"
                        onClick={() => {
                          onTemplateSelect(template.content);
                          setOpen(false);
                        }}
                        sx={{ borderRadius: 2 }}
                      >
                        Use Template
                      </Button>
                    }
                  >
                    <IconButton
                      onClick={() => toggleFavorite(template.id)}
                      size="medium"
                      aria-label={template.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      sx={{ mr: 1 }}
                    >
                      {template.isFavorite ? (
                        <Bookmark color="primary" fontSize="medium" />
                      ) : (
                        <BookmarkBorder fontSize="medium" />
                      )}
                    </IconButton>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium">
                          {template.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {template.description}
                        </Typography>
                      }
                      sx={{ mr: 2 }}
                    />
                  </ListItem>
                  <Divider component="li" sx={{ my: 1 }} />
                </React.Fragment>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No templates found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search or filter criteria
                </Typography>
                <Button variant="outlined" onClick={handleClearFilters} sx={{ mt: 2 }}>
                  Clear all filters
                </Button>
              </Box>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatementTemplates;
