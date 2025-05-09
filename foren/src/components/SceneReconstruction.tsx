import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Typography, Slider, ToggleButtonGroup, ToggleButton, Button, 
  Paper, IconButton, Snackbar, Alert, TextField, MenuItem, Select, 
  InputLabel, FormControl, Card, CardContent, Grid, Divider, Badge,
  Tooltip, FormControlLabel, Switch, Chip, Tabs, Tab, LinearProgress
} from '@mui/material';
import { 
  AddCircle, Delete, Edit, PersonPinCircle, RoomService, Fingerprint,
  Save, Visibility, VisibilityOff, ZoomIn, ZoomOut, RotateLeft, RotateRight,
  ThreeDRotation, CameraAlt, Layers, Timeline, Share, Print, Download,
  Warning, Error as ErrorIcon, CheckCircle, Info, GpsFixed, Map
} from '@mui/icons-material';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { saveAs } from 'file-saver';
import Avatar from '@mui/material/Avatar';

interface SceneMarker {
  id: number;
  x: number;
  y: number;
  z?: number;
  description: string;
  type: string;
  size?: number;
  rotation?: number;
  color?: string;
  timestamp: string;
  evidenceId?: string;
  confidence?: number;
  notes?: string;
}

const SceneReconstruction: React.FC = () => {
  // State management
  const [viewMode, setViewMode] = useState<'overhead' | '3d' | 'topographic'>('overhead');
  const [zoom, setZoom] = useState(50);
  const [markers, setMarkers] = useState<SceneMarker[]>([]);
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentMarkerType, setCurrentMarkerType] = useState('bloodstain');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('scene');
  const [selectedMarker, setSelectedMarker] = useState<SceneMarker | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [markerSize, setMarkerSize] = useState(1);
  const [sceneRotation, setSceneRotation] = useState(0);
  
  // Refs for Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Marker types with icons and colors
  const markerTypes = [
    { value: 'bloodstain', label: 'Bloodstain', icon: <PersonPinCircle />, color: '#d32f2f' },
    { value: 'weapon', label: 'Weapon', icon: <RoomService />, color: '#1976d2' },
    { value: 'footprint', label: 'Footprint', icon: <Fingerprint />, color: '#388e3c' },
    { value: 'fingerprint', label: 'Fingerprint', icon: <Fingerprint />, color: '#7b1fa2' },
    { value: 'bullet', label: 'Bullet', icon: <GpsFixed />, color: '#ffa000' },
    { value: 'clothing', label: 'Clothing', icon: <Layers />, color: '#5d4037' },
  ];

  // Initialize Three.js scene
  const initThreeScene = () => {
    if (!containerRef.current) return;

    // Clear previous scene if it exists
    if (rendererRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
    containerRef.current.removeChild(rendererRef.current.domElement);
  }

    // Create new scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
  containerRef.current.appendChild(renderer.domElement);
  rendererRef.current = renderer;


    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controlsRef.current = controls;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add grid helper if enabled
    if (showGrid) {
      const gridHelper = new THREE.GridHelper(10, 10);
      scene.add(gridHelper);
    }

    // Add markers to scene
    updateMarkersInScene();

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (rendererRef.current) {
      rendererRef.current.dispose();
      if (containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    }
    if (controlsRef.current) controlsRef.current.dispose();
  };
};

  // Update markers in Three.js scene
  const updateMarkersInScene = () => {
    if (!sceneRef.current) return;

    // Clear existing markers
    sceneRef.current.children.forEach(child => {
      if (child.userData.isMarker) {
        sceneRef.current?.remove(child);
      }
    });

    // Add new markers
    markers.forEach(marker => {
      const geometry = new THREE.SphereGeometry(marker.size || 0.1, 32, 32);
      const color = marker.color || markerTypes.find(t => t.value === marker.type)?.color || '#ff0000';
      const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color) });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(marker.x / 10 - 5, marker.y / 10 - 5, 0);
      sphere.userData = { ...marker, isMarker: true };
      sceneRef.current?.add(sphere);
    });
  };

  // Handle adding a new marker
  const handleAddMarker = () => {
    if (markers.length >= 20) {
      setError('Maximum of 20 markers allowed per scene.');
      return;
    }

    if (!currentDescription) {
      setError('Please add a description for the marker.');
      return;
    }

    const newMarker: SceneMarker = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // Avoid edges
      y: Math.random() * 80 + 10,
      description: currentDescription,
      type: currentMarkerType,
      size: markerSize,
      rotation: sceneRotation,
      color: markerTypes.find(t => t.value === currentMarkerType)?.color,
      timestamp: new Date().toISOString(),
      confidence: 0.8, // Default confidence
      notes: ''
    };

    setMarkers(prev => [...prev, newMarker]);
    setCurrentDescription('');
    setSuccess(`Added ${markerTypes.find(t => t.value === currentMarkerType)?.label} marker`);
  };

  // Handle marker selection
  const handleSelectMarker = (marker: SceneMarker) => {
    setSelectedMarker(marker);
    setActiveTab('details');
  };

  // Handle marker updates
  const handleUpdateMarker = (updatedMarker: SceneMarker) => {
    setMarkers(prev => prev.map(m => m.id === updatedMarker.id ? updatedMarker : m));
    setSuccess('Marker updated successfully');
  };

  // Handle scene export
  const handleExportScene = (format: 'json' | 'image' | 'glb') => {
    if (format === 'json') {
      const sceneData = {
        metadata: {
          version: 1.0,
          created: new Date().toISOString(),
          markers: markers.length
        },
        markers
      };
      const blob = new Blob([JSON.stringify(sceneData, null, 2)], { type: 'application/json' });
      saveAs(blob, `crime-scene-${new Date().toISOString().slice(0, 10)}.json`);
      setSuccess('Scene exported as JSON');
    } else if (format === 'image' && rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      const dataURL = rendererRef.current.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `crime-scene-${new Date().toISOString().slice(0, 10)}.png`;
      link.click();
      setSuccess('Scene exported as PNG');
    }
  };

  // Initialize and clean up Three.js scene
  useEffect(() => {
    const cleanup = initThreeScene();
    return () => {
      if (cleanup) cleanup();
    };
  }, [viewMode, showGrid, markers]);

  // Update markers when they change
  useEffect(() => {
    updateMarkersInScene();
  }, [markers]);

  // Auto-rotate scene if enabled
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 1;
    }
  }, [autoRotate]);

  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom>
        Crime Scene Reconstruction
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Create and analyze 3D reconstructions of crime scenes with forensic evidence markers
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Scene" value="scene" />
        <Tab 
          label={
            <Badge badgeContent={markers.length} color="primary">
              Evidence
            </Badge>
          } 
          value="evidence" 
          disabled={markers.length === 0}
        />
        <Tab 
          label="Details" 
          value="details" 
          disabled={!selectedMarker}
        />
      </Tabs>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Scene View Column */}
        <Grid item xs={12} md={activeTab === 'scene' ? 12 : 8}>
          <Card sx={{ height: '100%' }}>
            <Box
              ref={containerRef}
              sx={{
                height: 400,
                position: 'relative',
                bgcolor: 'grey.100'
              }}
            >
              {/* Scene controls overlay */}
              <Box sx={{ 
                position: 'absolute', 
                top: 8, 
                left: 8, 
                zIndex: 1000,
                display: 'flex',
                gap: 1
              }}>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, newView) => newView && setViewMode(newView)}
                  size="small"
                >
                  <Tooltip title="Overhead View">
                    <ToggleButton value="overhead">
                      <Map />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="3D View">
                    <ToggleButton value="3d">
                      <ThreeDRotation />
                    </ToggleButton>
                  </Tooltip>
                </ToggleButtonGroup>

                <Tooltip title="Toggle Grid">
  <IconButton 
    size="small" 
    color={showGrid ? 'primary' : 'default'}
    onClick={() => {
      // Ensure we don't trigger unnecessary state updates
      setShowGrid(prev => !prev);
    }}
  >
    <Layers />
  </IconButton>
</Tooltip>

<Tooltip title="Auto Rotate">
  <IconButton 
    size="small" 
    color={autoRotate ? 'primary' : 'default'}
    onClick={() => {
      
      setAutoRotate(prev => !prev);
    }}
  >
    <RotateRight />
  </IconButton>
</Tooltip>

              </Box>

              {/* Zoom controls overlay */}
              <Box sx={{ 
                position: 'absolute', 
                bottom: 8, 
                right: 8, 
                zIndex: 1000,
                width: 200
              }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Tooltip title="Zoom Out">
                      <IconButton size="small" onClick={() => setZoom(p => Math.max(10, p - 10))}>
                        <ZoomOut />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      value={zoom}
                      onChange={(_, value) => setZoom(value as number)}
                      min={10}
                      max={100}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <Tooltip title="Zoom In">
                      <IconButton size="small" onClick={() => setZoom(p => Math.min(100, p + 10))}>
                        <ZoomIn />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <CardContent>
              <Typography variant="subtitle2">
                {viewMode === 'overhead' ? 'Overhead View' : '3D Reconstruction'} - {markers.length} markers
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar Column - Changes based on active tab */}
        <Grid item xs={12} md={4}>
          {activeTab === 'scene' && (
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Add Evidence Marker
                </Typography>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Marker Type</InputLabel>
                  <Select
                    value={currentMarkerType}
                    onChange={(e) => setCurrentMarkerType(e.target.value as string)}
                    label="Marker Type"
                  >
                    {markerTypes.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {type.icon}
                          <Typography sx={{ ml: 1 }}>{type.label}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Description"
                  value={currentDescription}
                  onChange={(e) => setCurrentDescription(e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  helperText="Describe the evidence (e.g., 'Blood spatter near door')"
                />

                <Box sx={{ mb: 2 }}>
                  <Typography gutterBottom>Marker Size</Typography>
                  <Slider
                    value={markerSize}
                    onChange={(_, value) => setMarkerSize(value as number)}
                    min={0.5}
                    max={3}
                    step={0.1}
                    valueLabelDisplay="auto"
                  />
                </Box>

                <Button
                  variant="contained"
                  startIcon={<AddCircle />}
                  onClick={handleAddMarker}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Add Marker
                </Button>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Scene Actions
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      startIcon={<Save />}
                      onClick={() => handleExportScene('json')}
                      fullWidth
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={() => handleExportScene('image')}
                      fullWidth
                    >
                      Export
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      startIcon={<Print />}
                      onClick={() => window.print()}
                      fullWidth
                    >
                      Print
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      startIcon={<Share />}
                      onClick={() => setSuccess('Share functionality coming soon')}
                      fullWidth
                    >
                      Share
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {activeTab === 'evidence' && (
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Evidence Markers ({markers.length})
                </Typography>
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                  {markers.map(marker => (
                    <Card 
                      key={marker.id} 
                      sx={{ 
                        mb: 1,
                        border: selectedMarker?.id === marker.id ? '2px solid #1976d2' : '1px solid #ddd'
                      }}
                      onClick={() => handleSelectMarker(marker)}
                    >
                      <CardContent sx={{ p: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ 
                            bgcolor: markerTypes.find(t => t.value === marker.type)?.color,
                            width: 24, 
                            height: 24,
                            mr: 1
                          }}>
                            {markerTypes.find(t => t.value === marker.type)?.icon}
                          </Avatar>
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {marker.description}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveMarker(marker.id);
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {marker.type} • {new Date(marker.timestamp).toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {activeTab === 'details' && selectedMarker && (
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Marker Details
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: markerTypes.find(t => t.value === selectedMarker.type)?.color,
                    mr: 1
                  }}>
                    {markerTypes.find(t => t.value === selectedMarker.type)?.icon}
                  </Avatar>
                  <Typography variant="h6">
                    {selectedMarker.description}
                  </Typography>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="caption">Type</Typography>
                    <Typography>{selectedMarker.type}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption">Position</Typography>
                    <Typography>X: {selectedMarker.x.toFixed(1)}, Y: {selectedMarker.y.toFixed(1)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption">Date Added</Typography>
                    <Typography>{new Date(selectedMarker.timestamp).toLocaleString()}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption">Confidence</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(selectedMarker.confidence || 0) * 100} 
                        sx={{ flexGrow: 1, mr: 1 }}
                      />
                      <Typography>{(selectedMarker.confidence || 0).toFixed(1)}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <TextField
                  label="Notes"
                  value={selectedMarker.notes || ''}
                  onChange={(e) => handleUpdateMarker({ 
                    ...selectedMarker, 
                    notes: e.target.value 
                  })}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />

                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={() => handleUpdateMarker(selectedMarker)}
                  fullWidth
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Notifications */}
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(success)} autoHideDuration={4000} onClose={() => setSuccess(null)}>
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SceneReconstruction;