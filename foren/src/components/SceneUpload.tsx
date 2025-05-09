import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  LinearProgress,
  IconButton,
  Avatar,
  Snackbar,
  Alert,
  Chip,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Badge,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  CloudUpload,
  PhotoCamera,
  InsertDriveFile,
  Clear,
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Info,
  Delete,
  ZoomIn,
  Compare,
  Print,
  Share,
  Download,
  Pattern,
  Straighten
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';

interface SceneFile {
  file: File;
  metadata: {
    caseId?: string;
    location?: string;
    timestamp?: string;
    evidenceType?: 'footwear' | 'fingerprint' | 'blood' | 'toolmark' | 'other';
    notes?: string;
    isReference?: boolean;
  };
}

const SceneUpload: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<SceneFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [autoProcess, setAutoProcess] = useState(false);

  const maxFileSize = 50 * 1024 * 1024; // 50 MB limit (increased from 10MB)

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);

    const validFiles = acceptedFiles.filter((file) => {
      if (file.size > maxFileSize) {
        setError(`File "${file.name}" exceeds the 50MB limit.`);
        return false;
      }
      return file.type.startsWith('image/') || file.type.startsWith('video/');
    });

    if (validFiles.length > 0) {
      const newSceneFiles: SceneFile[] = validFiles.map(file => ({
        file,
        metadata: {
          evidenceType: 'footwear', // Default to footwear
          timestamp: new Date().toISOString()
        }
      }));
      setFiles(prev => [...prev, ...newSceneFiles]);
      
      if (autoProcess && validFiles.length > 0) {
        handleUpload();
      }
    }
  }, [autoProcess]);

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('No files to upload');
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      // Simulate upload progress (in a real app, this would be actual upload)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            processFiles();
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    } catch (err) {
      setError('Upload failed. Please try again.');
      setIsUploading(false);
    }
  };

  const processFiles = () => {
    // Simulate processing and analysis
    setTimeout(() => {
      const results = files.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        fileName: file.file.name,
        type: file.metadata.evidenceType || 'unknown',
        analysis: {
          patternMatch: Math.random() > 0.5 ? 'High' : 'Low',
          quality: ['Good', 'Fair', 'Poor'][Math.floor(Math.random() * 3)],
          features: generateRandomFeatures(file.metadata.evidenceType),
          measurements: generateRandomMeasurements()
        },
        status: 'completed'
      }));
      
      setAnalysisResults(results);
      setSuccess(`${files.length} files processed successfully`);
      setActiveTab('results');
    }, 1500);
  };

  const generateRandomFeatures = (type?: string) => {
    const baseFeatures = ['Clear pattern', 'Visible wear', 'Distinct edges'];
    if (type === 'footwear') {
      return [...baseFeatures, 'Tread visible', 'Size measurable'];
    } else if (type === 'fingerprint') {
      return [...baseFeatures, 'Ridge detail', 'Core visible'];
    }
    return baseFeatures;
  };

  const generateRandomMeasurements = () => ({
    width: (Math.random() * 10 + 5).toFixed(2) + ' cm',
    length: (Math.random() * 20 + 10).toFixed(2) + ' cm',
    angle: Math.floor(Math.random() * 360) + '°',
    resolution: (Math.random() * 300 + 100).toFixed(0) + ' dpi'
  });

  const handleClearFiles = () => {
    setFiles([]);
    setAnalysisResults([]);
    setSelectedFileIndex(null);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    if (selectedFileIndex === index) {
      setSelectedFileIndex(null);
    }
  };

  const handleMetadataChange = (index: number, field: string, value: any) => {
    const updatedFiles = [...files];
    updatedFiles[index].metadata = {
      ...updatedFiles[index].metadata,
      [field]: value
    };
    setFiles(updatedFiles);
  };

  const handleDownloadReport = () => {
    const report = {
      date: new Date().toISOString(),
      files: files.map(f => f.file.name),
      analysisResults,
      summary: `Processed ${files.length} files with ${analysisResults.filter(r => r.analysis.patternMatch === 'High').length} strong matches`
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    saveAs(blob, `forensic-report-${new Date().toISOString().slice(0, 10)}.json`);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.tiff'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    multiple: true,
    maxSize: maxFileSize
  });

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Avatar sx={{ width: 100, height: 100 }} src={URL.createObjectURL(file)} variant="rounded" />;
    } else if (file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      return (
        <video width="100" height="100" muted style={{ borderRadius: 4 }}>
          <source src={videoUrl} type={file.type} />
        </video>
      );
    }
    return <InsertDriveFile sx={{ fontSize: 50, color: '#888' }} />;
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <Warning color="warning" />;
      default:
        return <Info color="info" />;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Forensic Scene Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Upload and analyze crime scene evidence including footwear impressions, fingerprints, and tool marks
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Upload" value="upload" />
        <Tab 
          label={
            <Badge badgeContent={files.length} color="primary">
              Files
            </Badge>
          } 
          value="files" 
          disabled={files.length === 0}
        />
        <Tab 
          label={
            <Badge badgeContent={analysisResults.length} color="secondary">
              Results
            </Badge>
          } 
          value="results" 
          disabled={analysisResults.length === 0}
        />
      </Tabs>

      {activeTab === 'upload' && (
        <>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              mb: 2,
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f7f7f7' }
            }}
          >
            <CloudUpload sx={{ fontSize: 50, color: 'text.secondary', mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Drag & drop evidence files here
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Supported formats: JPEG, PNG, TIFF, MP4, MOV (Max 50MB each)
            </Typography>
            <Button variant="contained" sx={{ mt: 1 }}>
              Select Files
            </Button>
            <input {...getInputProps()} hidden />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={autoProcess}
                onChange={(e) => setAutoProcess(e.target.checked)}
                color="primary"
              />
            }
            label="Auto-process after upload"
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={showAdvanced}
                onChange={(e) => setShowAdvanced(e.target.checked)}
                color="primary"
              />
            }
            label="Show advanced options"
          />

          {showAdvanced && (
            <Card sx={{ mt: 2, p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Advanced Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Default Case ID"
                    fullWidth
                    size="small"
                    placeholder="Case-2023-XXXX"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Default Evidence Type</InputLabel>
                    <Select
                      value="footwear"
                      label="Default Evidence Type"
                    >
                      <MenuItem value="footwear">Footwear</MenuItem>
                      <MenuItem value="fingerprint">Fingerprint</MenuItem>
                      <MenuItem value="blood">Blood</MenuItem>
                      <MenuItem value="toolmark">Tool Mark</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Card>
          )}
        </>
      )}

      {activeTab === 'files' && files.length > 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={selectedFileIndex !== null ? 6 : 12}>
            <Typography variant="subtitle1" gutterBottom>
              Uploaded Files ({files.length})
            </Typography>
            <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
              {files.map((sceneFile, index) => (
                <Card 
                  key={index} 
                  sx={{ 
                    mb: 2, 
                    p: 2,
                    border: selectedFileIndex === index ? '2px solid #1976d2' : '1px solid #ddd'
                  }}
                  onClick={() => setSelectedFileIndex(index)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderFilePreview(sceneFile.file)}
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="subtitle2">{sceneFile.file.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {(sceneFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                      {sceneFile.metadata.evidenceType && (
                        <Chip 
                          label={sceneFile.metadata.evidenceType} 
                          size="small" 
                          sx={{ ml: 1 }} 
                        />
                      )}
                    </Box>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFile(index); }}>
                      <Delete color="error" />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          </Grid>

          {selectedFileIndex !== null && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                File Details & Metadata
              </Typography>
              <Card sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {renderFilePreview(files[selectedFileIndex].file)}
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Case ID"
                      fullWidth
                      size="small"
                      value={files[selectedFileIndex].metadata.caseId || ''}
                      onChange={(e) => handleMetadataChange(selectedFileIndex, 'caseId', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Evidence Type</InputLabel>
                      <Select
                        value={files[selectedFileIndex].metadata.evidenceType || 'footwear'}
                        label="Evidence Type"
                        onChange={(e) => handleMetadataChange(selectedFileIndex, 'evidenceType', e.target.value)}
                      >
                        <MenuItem value="footwear">Footwear</MenuItem>
                        <MenuItem value="fingerprint">Fingerprint</MenuItem>
                        <MenuItem value="blood">Blood</MenuItem>
                        <MenuItem value="toolmark">Tool Mark</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Location"
                      fullWidth
                      size="small"
                      value={files[selectedFileIndex].metadata.location || ''}
                      onChange={(e) => handleMetadataChange(selectedFileIndex, 'location', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Notes"
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      value={files[selectedFileIndex].metadata.notes || ''}
                      onChange={(e) => handleMetadataChange(selectedFileIndex, 'notes', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={files[selectedFileIndex].metadata.isReference || false}
                          onChange={(e) => handleMetadataChange(selectedFileIndex, 'isReference', e.target.checked)}
                        />
                      }
                      label="Reference Sample"
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
      )}

      {activeTab === 'results' && analysisResults.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1">
              Analysis Results ({analysisResults.length} files processed)
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Download />}
              onClick={handleDownloadReport}
            >
              Export Report
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            {analysisResults.map((result, index) => (
              <Grid item xs={12} md={6} key={result.id}>
                <Card sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {renderStatusIcon(result.status)}
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {result.fileName}
                    </Typography>
                    <Chip 
                      label={result.type} 
                      size="small" 
                      sx={{ ml: 1 }} 
                      color={result.type === 'footwear' ? 'primary' : 'secondary'}
                    />
                  </Box>
                  
                  <Typography variant="body2" gutterBottom>
                    <strong>Pattern Match:</strong> 
                    <Chip 
                      label={result.analysis.patternMatch} 
                      size="small" 
                      sx={{ ml: 1 }} 
                      color={result.analysis.patternMatch === 'High' ? 'success' : 'error'}
                    />
                  </Typography>
                  
                  <Typography variant="body2" gutterBottom>
                    <strong>Quality:</strong> {result.analysis.quality}
                  </Typography>
                  
                  <Typography variant="body2" gutterBottom>
                    <strong>Features:</strong>
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {result.analysis.features.map((feature: string, i: number) => (
                      <Chip key={i} label={feature} size="small" />
                    ))}
                  </Box>
                  
                  <Typography variant="body2" gutterBottom>
                    <strong>Measurements:</strong>
                  </Typography>
                  <Grid container spacing={1}>
                    {Object.entries(result.analysis.measurements).map(([key, value]) => (
                      <Grid item xs={6} key={key}>
                        <Typography variant="caption">
                          {key}: <strong>{value}</strong>
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Tooltip title="Compare">
                      <IconButton size="small">
                        <Compare fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Enhance">
                      <IconButton size="small">
                        <ZoomIn fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Print">
                      <IconButton size="small">
                        <Print fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 'upload' && files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Ready to Process ({files.length} files)
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Total size: {(files.reduce((sum, file) => sum + file.file.size, 0) / 1024 / 1024).toFixed(2)} MB
            </Typography>
            <Box>
              <Button
                variant="outlined"
                onClick={handleClearFiles}
                sx={{ mr: 2 }}
                startIcon={<Clear />}
              >
                Clear All
              </Button>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={isUploading}
                startIcon={<PhotoCamera />}
              >
                Process Evidence
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {isUploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" align="right">
            {progress}% complete
          </Typography>
        </Box>
      )}

      {/* Error Snackbar */}
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar open={Boolean(success)} autoHideDuration={4000} onClose={() => setSuccess(null)}>
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SceneUpload;