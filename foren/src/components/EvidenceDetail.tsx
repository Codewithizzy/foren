import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
  TextField,
  Button,
  IconButton,
  Tooltip,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  AlertTitle,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  CardActions
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FileUpload as FileUploadIcon,
  Download as DownloadIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Link as LinkIcon,
  History as HistoryIcon,
  Assignment as AssignmentIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';

// Types
interface Evidence {
  id: string;
  type: string;
  caseId: string;
  collectedTime: string;
  location: string;
  collectedBy: string;
  status: 'submitted' | 'processed' | 'analyzed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  integrity: 'intact' | 'compromised' | 'partial';
  description: string;
}

interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  createdBy: string;
  isEdited: boolean;
}

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface CustodyEvent {
  id: string;
  handler: string;
  role: string;
  time: string;
  location: string;
  action: string;
}

interface AuditLog {
  id: string;
  action: string;
  actor: string;
  time: string;
  details: string;
}

interface RelatedEvidence {
  id: string;
  type: string;
  relation: string;
  caseId: string;
}

const EvidenceDetails: React.FC = () => {
  const { evidenceId } = useParams<{ evidenceId: string }>();
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [custodyChain, setCustodyChain] = useState<CustodyEvent[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [relatedEvidence, setRelatedEvidence] = useState<RelatedEvidence[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({ open: false, message: '', severity: 'info' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const safeFormatDate = (dateString: string, formatStr: string = 'MMM dd, yyyy HH:mm') => {
    if (!dateString) return 'N/A';
    
    try {
      // Try parsing as ISO string first
      const date = parseISO(dateString);
      if (isNaN(date.getTime())) {
        // Fallback to Date constructor if parseISO fails
        const fallbackDate = new Date(dateString);
        if (!isNaN(fallbackDate.getTime())) {
          return format(fallbackDate, formatStr);
        }
        return 'Invalid date';
      }
      return format(date, formatStr);
    } catch (e) {
      console.error('Date formatting error:', e);
      return 'Invalid date';
    }
  };

  // Simulate data fetching
  useEffect(() => {
    // Mock data for demonstration
    const mockEvidence: Evidence = {
      id: evidenceId || 'EVD-2023-0456',
      type: 'Digital',
      caseId: 'CASE-2023-0789',
      collectedTime: '2023-05-15T14:30:00Z',
      location: 'Crime Scene - 123 Main St, Apt 4B',
      collectedBy: 'Detective Sarah Johnson',
      status: 'processed',
      priority: 'high',
      integrity: 'intact',
      description: 'iPhone 12 Pro Max with cracked screen found at the scene'
    };

    const mockNotes: Note[] = [
      {
        id: 'NOTE-001',
        content: 'Initial examination shows multiple photos deleted recently.',
        createdAt: '2023-05-15T15:45:00Z',
        createdBy: 'Tech Analyst Mark',
        isEdited: false
      },
      {
        id: 'NOTE-002',
        content: 'Found encrypted messaging apps installed.',
        createdAt: '2023-05-16T09:15:00Z',
        updatedAt: '2023-05-16T10:30:00Z',
        createdBy: 'Forensic Expert Lisa',
        isEdited: true
      }
    ];

    const mockFiles: File[] = [
      {
        id: 'FILE-001',
        name: 'device_image_1.jpg',
        type: 'image/jpeg',
        size: '2.4 MB',
        uploadedBy: 'Officer Smith',
        uploadedAt: '2023-05-15T16:20:00Z'
      },
      {
        id: 'FILE-002',
        name: 'forensic_report.pdf',
        type: 'application/pdf',
        size: '1.8 MB',
        uploadedBy: 'Tech Analyst Mark',
        uploadedAt: '2023-05-16T11:45:00Z'
      }
    ];

    const mockCustodyChain: CustodyEvent[] = [
      {
        id: 'CUST-001',
        handler: 'Officer Smith',
        role: 'First Responder',
        time: '2023-05-15T14:30:00Z',
        location: 'Crime Scene',
        action: 'Collected'
      },
      {
        id: 'CUST-002',
        handler: 'Detective Johnson',
        role: 'Lead Investigator',
        time: '2023-05-15T15:00:00Z',
        location: 'Evidence Locker',
        action: 'Checked In'
      },
      {
        id: 'CUST-003',
        handler: 'Tech Analyst Mark',
        role: 'Forensics',
        time: '2023-05-16T08:00:00Z',
        location: 'Lab 3',
        action: 'Analysis Started'
      }
    ];

    const mockAuditLogs: AuditLog[] = [
      {
        id: 'AUDIT-001',
        action: 'Evidence Created',
        actor: 'Officer Smith',
        time: '2023-05-15T14:30:00Z',
        details: 'Evidence collected at crime scene'
      },
      {
        id: 'AUDIT-002',
        action: 'Note Added',
        actor: 'Tech Analyst Mark',
        time: '2023-05-15T15:45:00Z',
        details: 'Initial examination note'
      },
      {
        id: 'AUDIT-003',
        action: 'File Uploaded',
        actor: 'Officer Smith',
        time: '2023-05-15T16:20:00Z',
        details: 'device_image_1.jpg'
      },
      {
        id: 'AUDIT-004',
        action: 'Note Edited',
        actor: 'Forensic Expert Lisa',
        time: '2023-05-16T10:30:00Z',
        details: 'Updated note about encrypted apps'
      }
    ];

    const mockRelatedEvidence: RelatedEvidence[] = [
      {
        id: 'EVD-2023-0457',
        type: 'Fingerprint',
        relation: 'Found on device',
        caseId: 'CASE-2023-0789'
      },
      {
        id: 'EVD-2023-0458',
        type: 'DNA Sample',
        relation: 'Recovered from device surface',
        caseId: 'CASE-2023-0789'
      }
    ];

    setEvidence(mockEvidence);
    setNotes(mockNotes);
    setFiles(mockFiles);
    setCustodyChain(mockCustodyChain);
    setAuditLogs(mockAuditLogs);
    setRelatedEvidence(mockRelatedEvidence);
  }, [evidenceId]);

  // Filter notes based on search term
  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle note operations
  const handleAddNote = () => {
    if (!noteContent.trim()) return;

    const newNote: Note = {
      id: `NOTE-${Date.now()}`,
      content: noteContent,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User', // In a real app, this would be the logged-in user
      isEdited: false
    };

    setNotes([...notes, newNote]);
    setNoteContent('');
    setIsNoteModalOpen(false);
    showNotification('Note added successfully', 'success');

    // Add to audit log
    const auditLog: AuditLog = {
      id: `AUDIT-${Date.now()}`,
      action: 'Note Added',
      actor: 'Current User',
      time: new Date().toISOString(),
      details: 'New analysis note'
    };
    setAuditLogs([auditLog, ...auditLogs]);
  };

  const handleEditNote = () => {
    if (!currentNote || !noteContent.trim()) return;

    const updatedNotes = notes.map(note =>
      note.id === currentNote.id
        ? {
            ...note,
            content: noteContent,
            updatedAt: new Date().toISOString(),
            isEdited: true
          }
        : note
    );

    setNotes(updatedNotes);
    setCurrentNote(null);
    setNoteContent('');
    setIsNoteModalOpen(false);
    showNotification('Note updated successfully', 'success');

    // Add to audit log
    const auditLog: AuditLog = {
      id: `AUDIT-${Date.now()}`,
      action: 'Note Edited',
      actor: 'Current User',
      time: new Date().toISOString(),
      details: 'Updated note content'
    };
    setAuditLogs([auditLog, ...auditLogs]);
  };

  const handleDeleteNote = () => {
    if (!currentNote) return;

    const updatedNotes = notes.filter(note => note.id !== currentNote.id);
    setNotes(updatedNotes);
    setIsDeleteDialogOpen(false);
    showNotification('Note deleted successfully', 'success');

    // Add to audit log
    const auditLog: AuditLog = {
      id: `AUDIT-${Date.now()}`,
      action: 'Note Deleted',
      actor: 'Current User',
      time: new Date().toISOString(),
      details: `Deleted note: ${currentNote.content.substring(0, 20)}...`
    };
    setAuditLogs([auditLog, ...auditLogs]);

    setCurrentNote(null);
  };

  // Handle file operations
  const handleFileUpload = () => {
    if (!selectedFile) return;

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      const newFile: File = {
        id: `FILE-${Date.now()}`,
        name: selectedFile.name,
        type: selectedFile.type || 'unknown',
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadedBy: 'Current User',
        uploadedAt: new Date().toISOString()
      };

      setFiles([...files, newFile]);
      setSelectedFile(null);
      setUploadProgress(0);
      setIsFileModalOpen(false);
      showNotification('File uploaded successfully', 'success');

      // Add to audit log
      const auditLog: AuditLog = {
        id: `AUDIT-${Date.now()}`,
        action: 'File Uploaded',
        actor: 'Current User',
        time: new Date().toISOString(),
        details: selectedFile.name
      };
      setAuditLogs([auditLog, ...auditLogs]);
    }, 3000);
  };

  const handleDeleteFile = () => {
    if (!currentFile) return;

    const updatedFiles = files.filter(file => file.id !== currentFile.id);
    setFiles(updatedFiles);
    setIsDeleteDialogOpen(false);
    showNotification('File deleted successfully', 'success');

    // Add to audit log
    const auditLog: AuditLog = {
      id: `AUDIT-${Date.now()}`,
      action: 'File Deleted',
      actor: 'Current User',
      time: new Date().toISOString(),
      details: currentFile.name
    };
    setAuditLogs([auditLog, ...auditLogs]);

    setCurrentFile(null);
  };

  const handleDownloadFile = (file: File) => {
    // Simulate download
    showNotification(`Downloading ${file.name}...`, 'info');
    setTimeout(() => {
      showNotification(`${file.name} downloaded successfully`, 'success');
    }, 1500);
  };

  // CSV Export
  const handleExportCSV = () => {
    // In a real app, this would generate an actual CSV file
    const csvData = {
      evidence,
      notes,
      files
    };
    console.log('Exporting CSV:', csvData);
    showNotification('CSV report generated and downloaded', 'success');
  };

  // Helper functions
  const showNotification = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <InfoIcon color="info" />;
      case 'processed':
        return <CheckCircleIcon color="success" />;
      case 'analyzed':
        return <AssignmentIcon color="primary" />;
      case 'archived':
        return <HistoryIcon color="action" />;
      default:
        return <InfoIcon />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'success';
      case 'medium':
        return 'info';
      case 'high':
        return 'warning';
      case 'critical':
        return 'error';
      default:
        return 'default';
    }
  };

  const getIntegrityIcon = (integrity: string) => {
    switch (integrity) {
      case 'intact':
        return <CheckCircleIcon color="success" />;
      case 'compromised':
        return <ErrorIcon color="error" />;
      case 'partial':
        return <WarningIcon color="warning" />;
      default:
        return <InfoIcon />;
    }
  };

  // DataGrid columns
  const fileColumns: GridColDef[] = [
    { field: 'name', headerName: 'File Name', width: 250 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'size', headerName: 'Size', width: 100 },
    { field: 'uploadedBy', headerName: 'Uploaded By', width: 150 },
    {
      field: 'uploadedAt',
      headerName: 'Upload Date',
      width: 180,
      valueFormatter: (params) => safeFormatDate(params.value, 'MMM dd, yyyy HH:mm')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: params => (
        <>
          <Tooltip title="Download">
            <IconButton onClick={() => handleDownloadFile(params.row)}>
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setCurrentFile(params.row);
                setIsDeleteDialogOpen(true);
              }}
            >
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ];

  const auditColumns: GridColDef[] = [
    { field: 'action', headerName: 'Action', width: 200 },
    { field: 'actor', headerName: 'Actor', width: 150 },
    {
      field: 'time',
      headerName: 'Time',
      width: 180,
      valueFormatter: (params) => safeFormatDate(params.value)
    },
    { field: 'details', headerName: 'Details', width: 300, flex: 1 }
  ];

  if (!evidence) {
    return <Typography>Loading evidence details...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Evidence Details: {evidence.id}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DescriptionIcon />}
          onClick={handleExportCSV}
        >
          Export CSV
        </Button>
      </Box>

      {/* Evidence Metadata */}
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Evidence Metadata"
          avatar={<AssignmentIcon />}
          action={
            <Chip
              icon={getStatusIcon(evidence.status)}
              label={evidence.status.toUpperCase()}
              variant="outlined"
              sx={{ textTransform: 'capitalize' }}
            />
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Type:</strong> {evidence.type}
              </Typography>
              <Typography variant="body1">
                <strong>Case ID:</strong> {evidence.caseId}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {evidence.description}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography variant="body1">
  <strong>Collected:</strong> {safeFormatDate(evidence.collectedTime)} by {evidence.collectedBy}
</Typography>
              <Typography variant="body1">
                <strong>Location:</strong> {evidence.location}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip
                  label={`Priority: ${evidence.priority}`}
                  color={getPriorityColor(evidence.priority)}
                  size="small"
                />
                <Tooltip
                  title={
                    evidence.integrity === 'intact'
                      ? 'Evidence is intact'
                      : evidence.integrity === 'compromised'
                      ? 'Evidence has been compromised'
                      : 'Partial integrity issues detected'
                  }
                >
                  <Chip
                    icon={getIntegrityIcon(evidence.integrity)}
                    label={`Integrity: ${evidence.integrity}`}
                    variant="outlined"
                    size="small"
                  />
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Analysis Notes" icon={<EditIcon />} />
        <Tab label="Files" icon={<DescriptionIcon />} />
        <Tab label="Custody Chain" icon={<PersonIcon />} />
        <Tab label="Related Evidence" icon={<LinkIcon />} />
        <Tab label="Audit Trail" icon={<HistoryIcon />} />
      </Tabs>

      {/* Analysis Notes Tab */}
      {activeTab === 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search notes..."
              InputProps={{
                startAdornment: <SearchIcon color="action" />
              }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setCurrentNote(null);
                setNoteContent('');
                setIsNoteModalOpen(true);
              }}
            >
              Add Note
            </Button>
          </Box>

          <List>
            {filteredNotes.length === 0 ? (
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', p: 2 }}>
                No notes found
              </Typography>
            ) : (
              filteredNotes.map(note => (
                <React.Fragment key={note.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Tooltip title={note.createdBy}>
                        <Avatar>
                          {note.createdBy.charAt(0).toUpperCase()}
                        </Avatar>
                      </Tooltip>
                    </ListItemAvatar>
                    <ListItemText
  primary={note.content}
  secondary={
    <>
      <Typography component="span" variant="body2" color="textPrimary" sx={{ display: 'block' }}>
        {note.createdBy}
      </Typography>
      {safeFormatDate(note.createdAt)}
      {note.isEdited && (
        <Typography component="span" variant="caption" color="textSecondary" sx={{ ml: 1 }}>
          (edited {safeFormatDate(note.updatedAt!)})
        </Typography>
      )}
    </>
  }
/>
                    <ListItemSecondaryAction>
                      <Tooltip title="Edit">
                        <IconButton
                          edge="end"
                          onClick={() => {
                            setCurrentNote(note);
                            setNoteContent(note.content);
                            setIsNoteModalOpen(true);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          edge="end"
                          onClick={() => {
                            setCurrentNote(note);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))
            )}
          </List>
        </Paper>
      )}

      {/* Files Tab */}
      {activeTab === 1 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<FileUploadIcon />}
              onClick={() => setIsFileModalOpen(true)}
            >
              Upload File
            </Button>
          </Box>

          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={files}
              columns={fileColumns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              components={{ Toolbar: GridToolbar }}
              disableSelectionOnClick
            />
          </Box>
        </Paper>
      )}

      {/* Custody Chain Tab */}
      {activeTab === 2 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <List>
            {custodyChain.map((event, index) => (
              <React.Fragment key={event.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      {event.handler.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1">
                        <strong>{event.handler}</strong> ({event.role}) - {event.action}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <ScheduleIcon fontSize="small" />
                          {safeFormatDate(new Date(event.time), 'MMM dd, yyyy HH:mm')}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <LocationIcon fontSize="small" />
                          {event.location}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < custodyChain.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Related Evidence Tab */}
      {activeTab === 3 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            {relatedEvidence.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      <LinkIcon color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {item.type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {item.relation}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Evidence ID: {item.id}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Case ID: {item.caseId}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<InfoIcon />}>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Audit Trail Tab */}
      {activeTab === 4 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={auditLogs}
              columns={auditColumns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              components={{ Toolbar: GridToolbar }}
              disableSelectionOnClick
            />
          </Box>
        </Paper>
      )}

      {/* Note Modal */}
      <Modal
        open={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        aria-labelledby="note-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1
          }}
        >
          <Typography id="note-modal-title" variant="h6" component="h2" gutterBottom>
            {currentNote ? 'Edit Note' : 'Add New Note'}
          </Typography>
          <TextField
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
            placeholder="Enter your analysis notes here..."
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <Button onClick={() => setIsNoteModalOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={currentNote ? handleEditNote : handleAddNote}
              disabled={!noteContent.trim()}
            >
              {currentNote ? 'Update Note' : 'Add Note'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* File Upload Modal */}
      <Modal
        open={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        aria-labelledby="file-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1
          }}
        >
          <Typography id="file-modal-title" variant="h6" component="h2" gutterBottom>
            Upload Evidence File
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={e => setSelectedFile(e.target.files?.[0] || null)}
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            fullWidth
            startIcon={<CloudUploadIcon />}
            onClick={() => fileInputRef.current?.click()}
            sx={{ mb: 2 }}
          >
            {selectedFile ? selectedFile.name : 'Select File'}
          </Button>
          {uploadProgress > 0 && (
            <Box sx={{ width: '100%', mb: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="caption" display="block" textAlign="right">
                {uploadProgress}%
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <Button onClick={() => setIsFileModalOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleFileUpload}
              disabled={!selectedFile || uploadProgress > 0}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete{' '}
            {currentNote
              ? 'this note?'
              : currentFile
              ? `the file "${currentFile.name}"?`
              : 'this item?'}
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={currentNote ? handleDeleteNote : handleDeleteFile}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EvidenceDetails;