import { Box, Typography } from '@mui/material';

export const ForensicLogo = ({ size = 24 }: { size?: number }) => {
  return (
    <Box sx={{
      width: size,
      height: size,
      borderRadius: '4px',
      bgcolor: 'primary.main',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: size * 0.6 }}>
        F
      </Typography>
    </Box>
  );
};