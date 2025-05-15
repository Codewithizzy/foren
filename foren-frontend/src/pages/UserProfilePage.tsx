import { Box, Typography, Avatar, TextField, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export const UserProfilePage = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
          {user?.name?.charAt(0) || 'U'}
        </Avatar>
        {!editMode && (
          <Button variant="outlined" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </Box>
      
      {editMode ? (
        <Box component="form">
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            defaultValue={user?.name || ''}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            defaultValue={user?.email || ''}
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" sx={{ mr: 2 }}>
              Save Changes
            </Button>
            <Button onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6">{user?.name}</Typography>
          <Typography>{user?.email}</Typography>
          <Typography>Role: {user?.role}</Typography>
        </Box>
      )}
    </Box>
  );
};