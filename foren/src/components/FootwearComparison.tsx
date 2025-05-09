import React, { useState, useEffect } from 'react';
import {
  DataGrid, GridColDef, GridToolbar, GridActionsCellItem, GridRowParams
} from '@mui/x-data-grid';
import {
  Box, Typography, TextField, Button, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Chip, IconButton, Tooltip, Paper, Avatar, Badge,
  Snackbar, Alert, Card, CardHeader, CardContent,
  Tabs, Tab, Select, MenuItem, FormControl, InputLabel,
  LinearProgress, Divider, Switch, FormControlLabel
} from '@mui/material';
import {
  Search, Add, Edit, Delete, FileUpload, Download,
  CheckCircle, Warning, Error as ErrorIcon, Info,
  Print, Share, Visibility, Close, CloudUpload,
  ZoomIn, Compare, PhotoCamera, Pattern, Straighten
} from '@mui/icons-material';
import { saveAs } from 'file-saver';

interface PatternDetail {
  type: string;
  size: number; // in mm
  arrangement: 'parallel' | 'zigzag' | 'circular' | 'random';
  wearLevel: 1 | 2 | 3 | 4 | 5; // 1 = new, 5 = heavily worn
  damage: string[];
  imageUrl?: string;
}

interface Footwear {
  id: number;
  brand: string;
  model: string;
  size: number;
  patternDetails: {
    type: string;
    size: number;
    arrangement: 'parallel' | 'zigzag' | 'circular' | 'random';
    wearLevel: 1 | 2 | 3 | 4 | 5;
    damage: string[];
    imageUrl?: string;
  };
  cases: string[];
  status: 'active' | 'archived' | 'in_review';
  lastUpdated: string;
  notes: string;
}

const initialFootwearData: Footwear[] = [
  {
    id: 1,
    brand: 'Nike',
    model: 'Air Force 1',
    size: 10,
    patternDetails: {
      type: 'Herringbone',
      size: 8,
      arrangement: 'parallel',
      wearLevel: 3,
      damage: ['scuffed toe', 'worn heel'],
      imageUrl: '/sample-shoe1.jpg'
    },
    cases: ['2023-0456', '2023-0789'],
    status: 'active',
    lastUpdated: '2023-05-15',
    notes: 'Common in urban crime scenes'
  },
  {
    id: 2,
    brand: 'Adidas',
    model: 'Superstar',
    size: 9,
    patternDetails: {
      type: 'Shell',
      size: 6,
      arrangement: 'zigzag',
      wearLevel: 2,
      damage: ['cracked sole'],
      imageUrl: '/sample-shoe2.jpg'
    },
    cases: ['2023-0332'],
    status: 'active',
    lastUpdated: '2023-05-16',
    notes: 'Distinctive shell pattern'
  },
  {
    id: 3,
    brand: 'Timberland',
    model: 'Premium',
    size: 11,
    patternDetails: {
      type: 'Lug',
      size: 12,
      arrangement: 'random',
      wearLevel: 4,
      damage: ['deep grooves', 'missing lugs'],
      imageUrl: '/sample-shoe3.jpg'
    },
    cases: ['2023-0115', '2023-0228', '2023-0677'],
    status: 'in_review',
    lastUpdated: '2023-05-17',
    notes: 'Common in outdoor crime scenes'
  }
];

const FootwearComparison: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [footwearData, setFootwearData] = useState<Footwear[]>(initialFootwearData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [currentFootwear, setCurrentFootwear] = useState<Footwear | null>(null);
  const [compareItems, setCompareItems] = useState<Footwear[]>([]);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });
  const [activeTab, setActiveTab] = useState('details');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showImages, setShowImages] = useState(true);

  const [formData, setFormData] = useState<Omit<Footwear, 'id' | 'lastUpdated'>>({
    brand: '',
    model: '',
    size: 0,
    patternDetails: {
      type: '',
      size: 0,
      arrangement: 'parallel',
      wearLevel: 1,
      damage: [],
    },
    cases: [],
    status: 'active',
    notes: ''
  });

  // Pattern analysis functions
  const getWearDescription = (level: number) => {
    const descriptions = [
      'New - Minimal wear',
      'Slightly worn',
      'Moderate wear',
      'Heavily worn',
      'Extreme wear - Distinctive patterns'
    ];
    return descriptions[level - 1] || '';
  };

  const getDamageBadges = (damages: string[]) => {
    return damages.map((damage, index) => (
      <Chip
        key={index}
        label={damage}
        size="small"
        color="error"
        variant="outlined"
        sx={{ mr: 1, mb: 1 }}
      />
    ));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleAddClick = () => {
    setFormData({
      brand: '',
      model: '',
      size: 0,
      patternDetails: {
        type: '',
        size: 0,
        arrangement: 'parallel',
        wearLevel: 1,
        damage: [],
      },
      cases: [],
      status: 'active',
      notes: ''
    });
    setDialogOpen(true);
  };

  const handleViewDetails = (footwear: Footwear) => {
    setCurrentFootwear(footwear);
    setDetailDialogOpen(true);
  };

  const handleCompare = (params: GridRowParams) => {
    const selectedItem = params.row;
    if (compareItems.some(item => item.id === selectedItem.id)) {
      setCompareItems(compareItems.filter(item => item.id !== selectedItem.id));
    } else if (compareItems.length < 2) {
      setCompareItems([...compareItems, selectedItem]);
    } else {
      showNotification('Maximum 2 items can be compared', 'warning');
    }
  };

  const handleCompareSubmit = () => {
    if (compareItems.length === 2) {
      setCompareDialogOpen(true);
    } else {
      showNotification('Please select exactly 2 items to compare', 'warning');
    }
  };

  const handleAddFootwear = () => {
    const { brand, model, size, patternDetails } = formData;
    if (!brand || !model || !size || !patternDetails.type || !patternDetails.size) {
      showNotification('Please fill all required fields', 'error');
      return;
    }

    const newEntry: Footwear = {
      id: footwearData.length > 0 ? Math.max(...footwearData.map(item => item.id)) + 1 : 1,
      ...formData,
      patternDetails: formData.patternDetails || { // Provide defaults if undefined
        type: '',
        size: 0,
        arrangement: 'parallel',
        wearLevel: 1,
        damage: []
      },
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setFootwearData([...footwearData, newEntry]);
    showNotification('Footwear added successfully', 'success');
    setDialogOpen(false);
  };

  const columns: GridColDef<Footwear>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'brand', headerName: 'Brand', width: 120 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'size', headerName: 'Size', width: 80, type: 'number' },
    {
      field: 'patternType',
      headerName: 'Pattern',
      width: 120,
      valueGetter: (params) => params?.row?.patternDetails?.type || 'N/A'
    },
    {
      field: 'patternSize',
      headerName: 'Pattern Size (mm)',
      width: 140,
      type: 'number',
      valueGetter: (params) => params?.row?.patternDetails?.size || 0
    },    
    {
      field: 'cases',
      headerName: 'Cases',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {params.row.cases?.map((caseId: string, index: number) => (
            <Chip key={index} label={caseId} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Box>
      )
    },
    {
      field: 'wearLevel',
      headerName: 'Wear',
      width: 120,
      renderCell: (params) => {
        const wearLevel = params.row.patternDetails?.wearLevel || 1;
        return (
          <Tooltip title={getWearDescription(wearLevel)}>
            <LinearProgress
              variant="determinate"
              value={wearLevel * 20}
              color={
                wearLevel >= 4 ? 'error' :
                wearLevel >= 2 ? 'warning' : 'success'
              }
              sx={{ width: 80, height: 8 }}
            />
          </Tooltip>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View Details"
          onClick={() => handleViewDetails(params.row)}
        />,
        <GridActionsCellItem
          icon={<Compare />}
          label="Compare"
          onClick={() => handleCompare(params)}
          sx={{
            color: compareItems.some(item => item.id === params.id) ? 'primary.main' : 'inherit'
          }}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            setFootwearData(footwearData.filter(item => item.id !== params.id));
            showNotification('Footwear deleted', 'success');
          }}
        />
      ]
    }
  ];

  const filteredData = footwearData.filter(item => {
    const matchesSearch = Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    ) || item.patternDetails.type.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Forensic Footwear Comparison
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Analyze and compare footwear patterns based on tread design, size, wear patterns, and damage characteristics.
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          <TextField
            placeholder="Search by brand, model, or pattern..."
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            sx={{ flexGrow: 1 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="in_review">In Review</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Switch checked={showImages} onChange={() => setShowImages(!showImages)} />}
            label="Show Images"
            sx={{ ml: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Compare />}
            onClick={handleCompareSubmit}
            disabled={compareItems.length !== 2}
          >
            Compare ({compareItems.length}/2)
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddClick}>
            Add Footwear
          </Button>
        </Box>
      </Box>

      <DataGrid
        rows={filteredData}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          }
        }}
      />

      {/* Add/Edit Footwear Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add New Footwear Evidence</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Basic Information
              </Typography>
              <TextField
                name="brand"
                label="Brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="model"
                label="Model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="size"
                label="Size (US)"
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) || 0 })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="cases"
                label="Associated Cases (comma separated)"
                value={formData.cases.join(', ')}
                onChange={(e) => setFormData({ ...formData, cases: e.target.value.split(',').map(c => c.trim()) })}
                fullWidth
                margin="normal"
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Pattern Analysis
              </Typography>
              <TextField
                name="patternType"
                label="Pattern Type"
                value={formData.patternDetails.type}
                onChange={(e) => setFormData({
                  ...formData,
                  patternDetails: { ...formData.patternDetails, type: e.target.value }
                })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="patternSize"
                label="Pattern Size (mm)"
                type="number"
                value={formData.patternDetails.size}
                onChange={(e) => setFormData({
                  ...formData,
                  patternDetails: { ...formData.patternDetails, size: parseInt(e.target.value) || 0 }
                })}
                fullWidth
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Pattern Arrangement</InputLabel>
                <Select
                  value={formData.patternDetails.arrangement}
                  label="Pattern Arrangement"
                  onChange={(e) => setFormData({
                    ...formData,
                    patternDetails: { ...formData.patternDetails, arrangement: e.target.value as any }
                  })}
                >
                  <MenuItem value="parallel">Parallel</MenuItem>
                  <MenuItem value="zigzag">Zigzag</MenuItem>
                  <MenuItem value="circular">Circular</MenuItem>
                  <MenuItem value="random">Random</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Wear Level</InputLabel>
                <Select
                  value={formData.patternDetails.wearLevel}
                  label="Wear Level"
                  onChange={(e) => setFormData({
                    ...formData,
                    patternDetails: { ...formData.patternDetails, wearLevel: parseInt(e.target.value) as any }
                  })}
                >
                  {[1, 2, 3, 4, 5].map(level => (
                    <MenuItem key={level} value={level}>
                      Level {level} - {getWearDescription(level)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="damage"
                label="Damage Characteristics (comma separated)"
                value={formData.patternDetails.damage.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  patternDetails: { ...formData.patternDetails, damage: e.target.value.split(',').map(c => c.trim()) }
                })}
                fullWidth
                margin="normal"
              />
            </Box>
          </Box>
          <TextField
            name="notes"
            label="Additional Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddFootwear}>
            Add Footwear
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footwear Detail Dialog */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} fullWidth maxWidth="md">
        {currentFootwear && (
          <>
            <DialogTitle>
              {currentFootwear.brand} {currentFootwear.model} - Size {currentFootwear.size}
            </DialogTitle>
            <DialogContent>
              <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
                <Tab label="Details" value="details" />
                <Tab label="Pattern Analysis" value="pattern" />
                <Tab label="Case History" value="cases" />
              </Tabs>

              {activeTab === 'details' && (
                <Box sx={{ display: 'flex', gap: 3 }}>
                  {showImages && currentFootwear.patternDetails.imageUrl && (
                    <Box sx={{ width: 300 }}>
                      <Card>
                        <CardHeader title="Footwear Image" />
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                          <img
                            src={currentFootwear.patternDetails.imageUrl}
                            alt={`${currentFootwear.brand} ${currentFootwear.model}`}
                            style={{ maxWidth: '100%', maxHeight: 300 }}
                          />
                        </Box>
                      </Card>
                    </Box>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Card>
                      <CardHeader title="Basic Information" />
                      <CardContent>
                        <Typography><strong>Brand:</strong> {currentFootwear.brand}</Typography>
                        <Typography><strong>Model:</strong> {currentFootwear.model}</Typography>
                        <Typography><strong>Size:</strong> {currentFootwear.size} (US)</Typography>
                        <Typography><strong>Status:</strong> 
                          <Chip
                            label={currentFootwear.status}
                            color={
                              currentFootwear.status === 'active'
                                ? 'success'
                                : currentFootwear.status === 'in_review'
                                ? 'warning'
                                : 'default'
                            }
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Typography>
                        <Typography><strong>Last Updated:</strong> {currentFootwear.lastUpdated}</Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              )}

              {activeTab === 'pattern' && (
                <Box sx={{ display: 'flex', gap: 3 }}>
                  {showImages && currentFootwear.patternDetails.imageUrl && (
                    <Box sx={{ width: 300 }}>
                      <Card>
                        <CardHeader title="Tread Pattern" />
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                          <img
                            src={currentFootwear.patternDetails.imageUrl}
                            alt="Tread pattern"
                            style={{ maxWidth: '100%', maxHeight: 300 }}
                          />
                        </Box>
                      </Card>
                    </Box>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Card>
                      <CardHeader title="Pattern Analysis" />
                      <CardContent>
                        <Typography><strong>Pattern Type:</strong> {currentFootwear.patternDetails.type}</Typography>
                        <Typography><strong>Pattern Size:</strong> {currentFootwear.patternDetails.size} mm</Typography>
                        <Typography><strong>Arrangement:</strong> 
                          <Chip label={currentFootwear.patternDetails.arrangement} sx={{ ml: 1 }} />
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                          <Typography sx={{ mr: 2 }}><strong>Wear Level:</strong> {currentFootwear.patternDetails.wearLevel}/5</Typography>
                          <LinearProgress
                            variant="determinate"
                            value={currentFootwear.patternDetails.wearLevel * 20}
                            color={
                              currentFootwear.patternDetails.wearLevel >= 4
                                ? 'error'
                                : currentFootwear.patternDetails.wearLevel >= 2
                                ? 'warning'
                                : 'success'
                            }
                            sx={{ width: 100, height: 8 }}
                          />
                        </Box>
                        <Typography><small>{getWearDescription(currentFootwear.patternDetails.wearLevel)}</small></Typography>
                        <Typography sx={{ mt: 2 }}><strong>Damage Characteristics:</strong></Typography>
                        <Box sx={{ mt: 1 }}>
                          {getDamageBadges(currentFootwear.patternDetails.damage)}
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              )}

              {activeTab === 'cases' && (
                <Card>
                  <CardHeader title="Associated Cases" />
                  <CardContent>
                    {currentFootwear.cases.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {currentFootwear.cases.map((caseId, index) => (
                          <Chip key={index} label={caseId} clickable onClick={() => {}} />
                        ))}
                      </Box>
                    ) : (
                      <Typography color="text.secondary">No cases associated</Typography>
                    )}
                  </CardContent>
                </Card>
              )}

              {currentFootwear.notes && (
                <Card sx={{ mt: 2 }}>
                  <CardHeader title="Investigator Notes" />
                  <CardContent>
                    <Typography>{currentFootwear.notes}</Typography>
                  </CardContent>
                </Card>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Comparison Dialog */}
      <Dialog open={compareDialogOpen} onClose={() => setCompareDialogOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle>Footwear Pattern Comparison</DialogTitle>
        <DialogContent>
          {compareItems.length === 2 && (
            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
              {compareItems.map((item, index) => (
                <Box key={index} sx={{ flex: 1 }}>
                  <Card>
                    <CardHeader
                      title={`${item.brand} ${item.model}`}
                      subheader={`Size: ${item.size} | Pattern: ${item.patternDetails.type}`}
                    />
                    {showImages && item.patternDetails.imageUrl && (
                      <Box sx={{ p: 2, textAlign: 'center' }}>
                        <img
                          src={item.patternDetails.imageUrl}
                          alt={`${item.brand} ${item.model}`}
                          style={{ maxWidth: '100%', maxHeight: 300 }}
                        />
                      </Box>
                    )}
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>Pattern Analysis</Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                        <Typography><strong>Type:</strong></Typography>
                        <Typography>{item.patternDetails.type}</Typography>
                        
                        <Typography><strong>Size:</strong></Typography>
                        <Typography>{item.patternDetails.size} mm</Typography>
                        
                        <Typography><strong>Arrangement:</strong></Typography>
                        <Typography>{item.patternDetails.arrangement}</Typography>
                        
                        <Typography><strong>Wear Level:</strong></Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LinearProgress
                            variant="determinate"
                            value={item.patternDetails.wearLevel * 20}
                            color={
                              item.patternDetails.wearLevel >= 4
                                ? 'error'
                                : item.patternDetails.wearLevel >= 2
                                ? 'warning'
                                : 'success'
                            }
                            sx={{ width: 60, height: 6, mr: 1 }}
                          />
                          <Typography>{item.patternDetails.wearLevel}/5</Typography>
                        </Box>
                        
                        <Typography><strong>Damage:</strong></Typography>
                        <Box>
                          {item.patternDetails.damage.map((dmg, i) => (
                            <Chip key={i} label={dmg} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Comparison Results" />
            <CardContent>
              {compareItems.length === 2 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Pattern Similarities:</Typography>
                  <ul>
                    <li>
                      <Typography>
                        Both shoes have {compareItems[0].patternDetails.type === compareItems[1].patternDetails.type 
                          ? 'the same pattern type' 
                          : 'different pattern types'}
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Size difference: {Math.abs(compareItems[0].patternDetails.size - compareItems[1].patternDetails.size)} mm
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Wear level difference: {Math.abs(compareItems[0].patternDetails.wearLevel - compareItems[1].patternDetails.wearLevel)} levels
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        {compareItems[0].patternDetails.arrangement === compareItems[1].patternDetails.arrangement 
                          ? 'Same pattern arrangement' 
                          : 'Different pattern arrangements'}
                      </Typography>
                    </li>
                  </ul>
                  <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Forensic Significance:</Typography>
                  <Typography>
                    {compareItems[0].patternDetails.type === compareItems[1].patternDetails.type &&
                    compareItems[0].patternDetails.size === compareItems[1].patternDetails.size
                      ? 'High probability of match based on pattern characteristics'
                      : 'Pattern characteristics differ significantly'}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompareDialogOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => {
            showNotification('Comparison report generated', 'success');
            setCompareDialogOpen(false);
          }}>
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FootwearComparison;