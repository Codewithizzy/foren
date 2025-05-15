import { Box, Typography, Link, Divider, Stack } from '@mui/material';

export const Footer = () => {
  return (
    <Box component="footer" sx={{ 
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: (theme) => 
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    }}>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Foren Forensic Systems. All rights reserved.
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Link href="#" color="inherit" underline="hover">
            <Typography variant="body2">Privacy</Typography>
          </Link>
          <Link href="#" color="inherit" underline="hover">
            <Typography variant="body2">Terms</Typography>
          </Link>
          <Link href="#" color="inherit" underline="hover">
            <Typography variant="body2">Contact</Typography>
          </Link>
        </Stack>
        
        <Typography variant="body2" color="text.secondary">
          v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
        </Typography>
      </Box>
    </Box>
  );
};