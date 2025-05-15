import { Stack, Link, Typography } from '@mui/material';

export const FooterLinks = () => {
  return (
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
  );
};