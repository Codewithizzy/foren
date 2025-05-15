import { Box, Typography, Slider, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { MapContainer, TileLayer, HeatmapLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

export const PredictiveMapPage = () => {
  const [timeRange, setTimeRange] = useState(7);
  const [crimeType, setCrimeType] = useState('all');

  // Mock heatmap data
  const heatmapData = [
    { lat: 51.505, lng: -0.09, intensity: 0.6 },
    // More data points...
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 200px)' }}>
      <Typography variant="h4" gutterBottom>
        Predictive Crime Map
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', gap: 3 }}>
        <Box sx={{ width: 300 }}>
          <Typography gutterBottom>Time Range: {timeRange} days</Typography>
          <Slider
            value={timeRange}
            onChange={(e, val) => setTimeRange(val as number)}
            min={1}
            max={30}
          />
        </Box>

        <ToggleButtonGroup
          value={crimeType}
          exclusive
          onChange={(e, newValue) => setCrimeType(newValue)}
        >
          <ToggleButton value="all">All Crimes</ToggleButton>
          <ToggleButton value="theft">Theft</ToggleButton>
          <ToggleButton value="assault">Assault</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={13} 
        style={{ height: '100%', borderRadius: 8 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer
          points={heatmapData}
          longitudeExtractor={p => p.lng}
          latitudeExtractor={p => p.lat}
          intensityExtractor={p => p.intensity}
        />
      </MapContainer>
    </Box>
  );
};