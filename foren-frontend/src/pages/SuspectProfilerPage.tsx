import { Box, Typography, Card, CardContent, Grid, Divider, Chip } from '@mui/material';
import { Person, Fingerprint, Psychology, History } from '@mui/icons-material';

export const SuspectProfilerPage = () => {
  // Mock suspect profile - replace with API data
  const profile = {
    name: "John Doe",
    age: 34,
    riskLevel: "High",
    behavioralTraits: ["Impulsive", "Violent Tendencies"],
    knownAssociates: ["Jane Smith", "Mike Johnson"],
    modusOperandi: "Uses blunt weapons, strikes between 2-4 AM"
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Suspect Profiler
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person sx={{ mr: 1, fontSize: 40 }} />
                <Typography variant="h5">{profile.name}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />

              <Typography><strong>Age:</strong> {profile.age}</Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Risk Level:</strong> 
                <Chip label={profile.riskLevel} color="error" sx={{ ml: 1 }} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Psychology sx={{ mr: 1 }} />
                <Typography variant="h6">Behavioral Profile</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {profile.behavioralTraits.map(trait => (
                  <Chip key={trait} label={trait} variant="outlined" />
                ))}
              </Box>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {profile.modusOperandi}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <History sx={{ mr: 1 }} />
                <Typography variant="h6">Known Associates</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.knownAssociates.map(associate => (
                  <Chip key={associate} label={associate} icon={<Person />} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI-Generated Profile Analysis
              </Typography>
              <Typography>
                Based on crime scene evidence and historical data, the suspect likely has
                prior experience with violent crimes and may have a history of substance
                abuse. The pattern of attacks suggests possible military or law enforcement
                training.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};