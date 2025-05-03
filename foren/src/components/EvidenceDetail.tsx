import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
  Modal,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Fingerprint,
  Science,
  PhotoCamera,
  Description,
  Edit,
  Download,
  Comment,
  FileUpload,
  Search,
  Close,
  Delete,
  Link,
  CheckCircle,
  Error,
  Pending,
  AddLink,
  History,
  Person,
  Schedule,
  NoteAdd,
  CloudUpload,
  FileCopy,
  VerifiedUser,
  Lock
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';
import './EvidenceDetail.css';

interface Note {
  id: number;
  text: string;
  author: string;
  timestamp: string;
  edited: boolean;
}

interface EvidenceFile {
  id: number;
  name: string;
  type: string;
  size: string;
  uploaded: string;
  uploadedBy: string;
}

interface CustodyEntry {
  id: number;
  handler: string;
  role: string;
  time: string;
  location: string;
}

interface RelatedEvidence {
  id: string;
  type: string;
  status: string;
}

interface AuditEntry {
  id: number;
  action: string;
  by: string;
  time: string;
  details: string;
}

const EvidenceDetail: React.FC = () => {
  // State management
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: 'Size 10, distinct wear pattern on right heel', author: 'Analyst A', timestamp: '2023-05-15 11:00', edited: false },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [files, setFiles] = useState<EvidenceFile[]>([
    { id: 1, name: 'photo1.jpg', type: 'image/jpeg', size: '1.2MB', uploaded: '2023-05-15', uploadedBy: 'Officer Smith' },
    { id: 2, name: 'report.pdf', type: 'application/pdf', size: '500KB', uploaded: '2023-05-15', uploadedBy: 'Lab Technician' },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Evidence data
  const evidence = {
    id: 'E-001',
    type: 'Footwear Impression',
    caseId: 'C-2023-015',
    collected: '2023-05-15 10:30',
    collectedBy: 'Officer Smith',
    location: 'Bank entrance',
    status: 'Analyzed',
    priority: 'High',
    integrity: 'Intact',
    custodyChain: [
      { id: 1, handler: 'Officer Smith', role: 'Collecting Officer', time: '2023-05-15 10:30', location: 'Crime Scene' },
      { id: 2, handler: 'Lab Technician Joe', role: 'Evidence Processor', time: '2023-05-15 13:00', location: 'Forensic Lab' },
    ],
    relatedEvidence: [
      { id: 'E-002', type: 'Fingerprint', status: 'Analyzed' },
      { id: 'E-003', type: 'DNA Sample', status: 'Pending' },
    ],
    auditTrail: [
      { id: 1, action: 'Note Added', by: 'Analyst A', time: '2023-05-15 11:00', details: 'Initial analysis note' },
      { id: 2, action: 'File Uploaded', by: 'Officer Smith', time: '2023-05-15 10:40', details: 'photo1.jpg' },
      { id: 3, action: 'Status Changed', by: 'Lab Supervisor', time: '2023-05-16 09:15', details: 'From "Pending" to "Analyzed"' },
    ],
  };

  // Handlers
  const handleAddNote = () => {
    if (!noteInput.trim()) {
      setNotification({ open: true, message: 'Note cannot be empty', severity: 'error' });
      return;
    }
    
    if (selectedNote) {
      // Edit existing note
      setNotes(notes.map(note => 
        note.id === selectedNote 
          ? { ...note, text: noteInput, edited: true, timestamp: new Date().toLocaleString() }
          : note
      ));
      setNotification({ open: true, message: 'Note updated successfully', severity: 'success' });
    } else {
      // Add new note
      const newNote = {
        id: notes.length + 1,
        text: noteInput,
        author: 'You',
        timestamp: new Date().toLocaleString(),
        edited: false
      };
      setNotes([newNote, ...notes]);
      setNotification({ open: true, message: 'Note added successfully', severity: 'success' });
    }
    
    setNoteInput('');
    setSelectedNote(null);
    setOpenNotesModal(false);
  };

  const handleEditNote = (noteId: number) => {
    const noteToEdit = notes.find(note => note.id === noteId);
    if (noteToEdit) {
      setNoteInput(noteToEdit.text);
      setSelectedNote(noteId);
      setOpenNotesModal(true);
    }
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
    setNotification({ open: true, message: 'Note deleted successfully', severity: 'success' });
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      setNotification({ open: true, message: 'Please select a file first', severity: 'error' });
      return;
    }
    
    setUploading(true);
    setFileUploadProgress(0);
    
    // Simulate file upload
    const interval = setInterval(() => {
      setFileUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Add the new file
          const newFile = {
            id: files.length + 1,
            name: selectedFile.name,
            type: selectedFile.type || 'Unknown',
            size: `${(selectedFile.size / 1024 / 1024).toFixed(1)}MB`,
            uploaded: new Date().toLocaleDateString(),
            uploadedBy: 'You'
          };
          
          setFiles([newFile, ...files]);
          setNotification({ open: true, message: 'File uploaded successfully', severity: 'success' });
          setOpenFileModal(false);
          setSelectedFile(null);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDownloadFile = (fileId: number) => {
    // In a real app, this would download the file
    const file = files.find(f => f.id === fileId);
    if (file) {
      setNotification({ open: true, message: `Downloading ${file.name}...`, severity: 'info' });
    }
  };

  const handleDeleteFile = (fileId: number) => {
    setFiles(files.filter(file => file.id !== fileId));
    setNotification({ open: true, message: 'File deleted successfully', severity: 'success' });
  };

  const filteredNotes = notes.filter(n => 
    n.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Columns for files table
  const fileColumns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'File Name', 
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FileCopy sx={{ mr: 1 }} />
          {params.value}
        </Box>
      )
    },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'size', headerName: 'Size', width: 120 },
    { field: 'uploaded', headerName: 'Uploaded', width: 150 },
    { field: 'uploadedBy', headerName: 'Uploaded By', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Download">
            <IconButton size="small" onClick={() => handleDownloadFile(params.row.id)}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDeleteFile(params.row.id)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  // Columns for audit trail table
  const auditColumns: GridColDef[] = [
    { field: 'action', headerName: 'Action', width: 200 },
    { field: 'by', headerName: 'By', width: 150 },
    { field: 'time', headerName: 'Time', width: 150 },
    { field: 'details', headerName: 'Details', width: 300 },
  ];

  return (
    <Box className="evidence-container">
      {/* Header */}
      <Box className="evidence-header">
        <Typography variant="h4" component="h1" className="evidence-title">
          Evidence Details: {evidence.id}
        </Typography>
        <Box className="evidence-actions">
          <CSVLink 
            data={[
              ['ID', 'Type', 'Case ID', 'Status'],
              [evidence.id, evidence.type, evidence.caseId, evidence.status],
              ...notes.map(note => ['Note', note.text, note.author, note.timestamp]),
              ...files.map(file => ['File', file.name, file.type, file.uploaded])
            ]}
            filename={`evidence_${evidence.id}_report.csv`}
            className="csv-link"
          >
            <Button variant="contained" startIcon={<Download />} className="primary-button">
              Export Report
            </Button>
          </CSVLink>
          <Button variant="outlined" startIcon={<Link />} className="secondary-button">
            Link Evidence
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12} md={6}>
          <Paper className="evidence-card">
            <Box className="section-header">
              <Fingerprint className="section-icon" />
              <Typography variant="h6" className="section-title">Basic Information</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Type</Typography>
                <Typography>{evidence.type}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Case ID</Typography>
                <Typography>
                  <Button color="primary">{evidence.caseId}</Button>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Collected</Typography>
                <Typography>{evidence.collected}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Collected By</Typography>
                <Typography>{evidence.collectedBy}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Location Found</Typography>
                <Typography>{evidence.location}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Status</Typography>
                <Chip
                  label={evidence.status}
                  className={`status-chip ${evidence.status.toLowerCase()}`}
                  icon={
                    evidence.status === 'Analyzed' ? <CheckCircle /> :
                    evidence.status === 'Pending' ? <Pending /> : <Error />
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Priority</Typography>
                <Chip
                  label={evidence.priority}
                  className={`priority-${evidence.priority.toLowerCase()}`}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Integrity</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip
                    label={evidence.integrity}
                    className={`integrity-${evidence.integrity.toLowerCase()}`}
                    icon={evidence.integrity === 'Intact' ? <VerifiedUser /> : <Lock />}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Analysis Notes */}
        <Grid item xs={12} md={6}>
          <Paper className="evidence-card">
            <Box className="section-header" sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Science className="section-icon" />
                <Typography variant="h6" className="section-title">Analysis Notes</Typography>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<NoteAdd />}
                onClick={() => {
                  setSelectedNote(null);
                  setOpenNotesModal(true);
                }}
                className="primary-button"
              >
                Add Note
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <List className="notes-list">
              {filteredNotes.map((note) => (
                <ListItem 
                  key={note.id} 
                  className={`note-item ${note.edited ? 'edited' : ''}`}
                >
                  <ListItemAvatar>
                    <Avatar className="custody-avatar">
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography className="note-text">{note.text}</Typography>}
                    secondary={`${note.author} • ${note.timestamp}${note.edited ? ' • Edited' : ''}`}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Edit note">
                      <IconButton onClick={() => handleEditNote(note.id)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete note">
                      <IconButton onClick={() => handleDeleteNote(note.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Attached Files */}
        <Grid item xs={12}>
          <Paper className="evidence-card">
            <Box className="section-header" sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhotoCamera className="section-icon" />
                <Typography variant="h6" className="section-title">Attached Files</Typography>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<CloudUpload />}
                onClick={() => setOpenFileModal(true)}
                className="primary-button"
              >
                Upload File
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <DataGrid
              rows={files}
              columns={fileColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              autoHeight
              className="file-list"
            />
          </Paper>
        </Grid>

        {/* Chain of Custody */}
        <Grid item xs={12} md={6}>
          <Paper className="evidence-card">
            <Box className="section-header">
              <History className="section-icon" />
              <Typography variant="h6" className="section-title">Chain of Custody</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <List>
              {evidence.custodyChain.map((entry) => (
                <ListItem key={entry.id} className="custody-item">
                  <ListItemAvatar>
                    <Avatar className="custody-avatar">
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={entry.handler}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" display="block">
                          {entry.role}
                        </Typography>
                        <Typography component="span" variant="body2" display="block">
                          {entry.time} • {entry.location}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Related Evidence */}
        <Grid item xs={12} md={6}>
          <Paper className="evidence-card">
            <Box className="section-header">
              <AddLink className="section-icon" />
              <Typography variant="h6" className="section-title">Related Evidence</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2} className="related-evidence-grid">
              {evidence.relatedEvidence.map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Paper className="related-item">
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      <Button color="primary">{item.id}</Button>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Type: {item.type}
                    </Typography>
                    <Chip
                      label={item.status}
                      size="small"
                      className={`status-chip ${item.status.toLowerCase()}`}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Audit Trail */}
        <Grid item xs={12}>
          <Paper className="evidence-card">
            <Box className="section-header">
              <Schedule className="section-icon" />
              <Typography variant="h6" className="section-title">Audit Trail</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <DataGrid
              rows={evidence.auditTrail}
              columns={auditColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              autoHeight
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Add/Edit Note Modal */}
      <Modal open={openNotesModal} onClose={() => setOpenNotesModal(false)} className="evidence-modal">
        <Paper className="modal-content">
          <Box className="modal-header">
            <Typography variant="h6" className="modal-title">
              {selectedNote ? 'Edit Note' : 'Add New Note'}
            </Typography>
            <IconButton onClick={() => setOpenNotesModal(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <TextField
            multiline
            rows={6}
            fullWidth
            value={noteInput}
            onChange={e => setNoteInput(e.target.value)}
            placeholder="Enter your analysis notes here..."
            variant="outlined"
          />
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              onClick={() => setOpenNotesModal(false)}
              sx={{ mr: 2 }}
              className="secondary-button"
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleAddNote}
              disabled={!noteInput.trim()}
              className="primary-button"
            >
              {selectedNote ? 'Update Note' : 'Add Note'}
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* File Upload Modal */}
      <Modal open={openFileModal} onClose={() => setOpenFileModal(false)} className="evidence-modal">
        <Paper className="modal-content">
          <Box className="modal-header">
            <Typography variant="h6" className="modal-title">Upload New File</Typography>
            <IconButton onClick={() => setOpenFileModal(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          
          <Button
            variant="outlined"
            fullWidth
            onClick={() => fileInputRef.current?.click()}
            sx={{ mb: 2 }}
            className="secondary-button"
          >
            {selectedFile ? selectedFile.name : 'Select File'}
          </Button>
          
          {selectedFile && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">File: {selectedFile.name}</Typography>
              <Typography variant="body2">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</Typography>
              <Typography variant="body2">Type: {selectedFile.type || 'Unknown'}</Typography>
            </Box>
          )}
          
          {uploading && (
            <Box className="upload-progress">
              <LinearProgress variant="determinate" value={fileUploadProgress} />
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Uploading: {fileUploadProgress}%
              </Typography>
            </Box>
          )}
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              onClick={() => setOpenFileModal(false)}
              sx={{ mr: 2 }}
              className="secondary-button"
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleFileUpload}
              disabled={!selectedFile || uploading}
              startIcon={<CloudUpload />}
              className="primary-button"
            >
              Upload
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({...notification, open: false})}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity={notification.severity as any} 
          sx={{ width: '100%' }}
          className={`snackbar-${notification.severity}`}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EvidenceDetail;