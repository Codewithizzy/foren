import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import { Person, Fingerprint, Warning } from '@mui/icons-material';
import { Close } from '@mui/icons-material';

interface Suspect {
  id: number;
  name: string;
  status: string;
  match: string;
  description: string;
}

export const SuspectsPanel = ({ caseId }: { caseId: string }) => {
  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [newSuspect, setNewSuspect] = useState<Suspect>({
    id: 0,
    name: '',
    status: '',
    match: '',
    description: '',
  });
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [matchFilter, setMatchFilter] = useState<number | ''>('');

  useEffect(() => {
    const fetchSuspects = async () => {
      try {
        setLoading(true);
        // TODO: Replace with an actual API call using `caseId`
        const response = await new Promise<Suspect[]>((resolve) =>
          setTimeout(() => {
            resolve([
              {
                id: 1,
                name: 'John Doe',
                status: 'Person of Interest',
                match: '85% footwear match',
                description: 'Located near the scene, known to have a criminal history.',
              },
              {
                id: 2,
                name: 'Jane Smith',
                status: 'Witness',
                match: 'No direct evidence',
                description: 'Was in the area but has no connection to the crime.',
              },
              {
                id: 3,
                name: 'Mike Johnson',
                status: 'Suspect',
                match: '90% fingerprint match',
                description: 'Fingerprints found on the weapon used in the crime.',
              },
            ]);
          }, 1000)
        );
        setSuspects(response);
        setError(null);
      } catch (err) {
        setError('Failed to load suspects data.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuspects();
  }, [caseId]);

  const handleOpenProfile = (suspect: Suspect) => {
    setSelectedSuspect(suspect);
    setOpenProfileModal(true);
  };

  const handleCloseProfile = () => {
    setOpenProfileModal(false);
    setSelectedSuspect(null);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewSuspect({
      id: 0,
      name: '',
      status: '',
      match: '',
      description: '',
    });
  };

  const handleAddSuspect = () => {
    if (newSuspect.name && newSuspect.status && newSuspect.match && newSuspect.description) {
      const newSuspectId = suspects.length + 1;
      const addedSuspect = { ...newSuspect, id: newSuspectId };
      setSuspects([...suspects, addedSuspect]);
      handleCloseAddModal();
    } else {
      setError('All fields are required');
    }
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as string);
  };

  const handleMatchFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMatchFilter(event.target.value as number);
  };

  const filteredSuspects = suspects.filter((suspect) => {
    const statusMatch = statusFilter ? suspect.status === statusFilter : true;
    const matchPercentage = matchFilter ? parseInt(suspect.match) >= matchFilter : true;
    return statusMatch && matchPercentage;
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Suspects & Persons of Interest
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <FormControl variant="outlined" sx={{ width: '48%' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Status"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Person of Interest">Person of Interest</MenuItem>
            <MenuItem value="Witness">Witness</MenuItem>
            <MenuItem value="Suspect">Suspect</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ width: '48%' }}>
          <InputLabel>Match %</InputLabel>
          <Select
            value={matchFilter}
            onChange={handleMatchFilterChange}
            label="Match %"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={70}>70%</MenuItem>
            <MenuItem value={80}>80%</MenuItem>
            <MenuItem value={90}>90%</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <List>
        {filteredSuspects.map((suspect) => (
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
              <Button size="small" variant="outlined" onClick={() => handleOpenProfile(suspect)}>
                View Profile
              </Button>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>

      <Button variant="contained" sx={{ mt: 2 }} startIcon={<Person />} onClick={handleOpenAddModal}>
        Add New Suspect
      </Button>

      {/* Suspect Profile Modal */}
      <Dialog open={openProfileModal} onClose={handleCloseProfile}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Suspect Profile</Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseProfile}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedSuspect && (
            <Box>
              <Typography variant="h6">{selectedSuspect.name}</Typography>
              <Typography variant="subtitle1">{selectedSuspect.status}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {selectedSuspect.description}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Suspect Modal */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle>
          <Typography variant="h6">Add New Suspect</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={newSuspect.name}
            onChange={(e) => setNewSuspect({ ...newSuspect, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Status"
            variant="outlined"
            value={newSuspect.status}
            onChange={(e) => setNewSuspect({ ...newSuspect, status: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Match Percentage"
            variant="outlined"
            value={newSuspect.match}
            onChange={(e) => setNewSuspect({ ...newSuspect, match: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={newSuspect.description}
            onChange={(e) => setNewSuspect({ ...newSuspect, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSuspect} color="primary">
            Add Suspect
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SuspectsPanel;
