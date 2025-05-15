import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Email } from '@mui/icons-material';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Email sx={{ fontSize: 60, color: 'primary.main' }} />
        <Typography variant="h5" gutterBottom>
          Reset Your Password
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" size="large" fullWidth>
          Send Reset Link
        </Button>
      </Box>
    </Container>
  );
};