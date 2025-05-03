import React, { useState } from 'react';
import { 
  Box, Button, Typography, Paper, TextField, MenuItem, Select, 
  InputLabel, FormControl, Modal, Grid, Snackbar, IconButton,
  Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  InputAdornment, Badge
} from '@mui/material';
import { 
  Add, Delete, EscalatorWarning, FileDownload, 
  Search, FilterAlt, Refresh, Close 
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridToolbar, GridSelectionModel } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';
import './CaseListPage.css';

interface Case {
  id: string;
  title: string;
  status: 'Active' | 'Pending' | 'Escalated';
  priority: 'High' | 'Medium' | 'Low';
  created: string;
  assignedTo: string;
  description?: string;
}

interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

// Sample data
const initialCases: Case[] = [
  { id: 'C-2023-001', title: 'Bank Robbery - Main Street', status: 'Active', priority: 'High', created: '2023-05-15', assignedTo: 'John Doe' },
  { id: 'C-2023-002', title: 'Fraud Investigation - Acme Corp', status: 'Pending', priority: 'Medium', created: '2023-05-10', assignedTo: 'Jane Smith' },
  { id: 'C-2023-003', title: 'Arson Incident - Warehouse District', status: 'Escalated', priority: 'High', created: '2023-04-25', assignedTo: 'Mike Ross' },
  { id: 'C-2023-004', title: 'Cyber Attack - Financial Systems', status: 'Active', priority: 'High', created: '2023-06-01', assignedTo: 'Sarah Johnson' },
  { id: 'C-2023-005', title: 'Missing Person - Downtown Area', status: 'Pending', priority: 'Medium', created: '2023-05-28', assignedTo: 'David Wilson' },
  { id: 'C-2023-006', title: 'Evidence Tampering - Court Case #45', status: 'Active', priority: 'Low', created: '2023-06-05', assignedTo: 'Emily Chen' },
  { id: 'C-2023-007', title: 'Drug Trafficking - Harbor Investigation', status: 'Escalated', priority: 'High', created: '2023-04-15', assignedTo: 'Robert Garcia' },
  { id: 'C-2023-008', title: 'Financial Fraud - Pension Fund', status: 'Active', priority: 'Medium', created: '2023-05-20', assignedTo: 'Lisa Wong' },
];

const CaseListPage: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [notification, setNotification] = useState<NotificationState>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);
  const [newCase, setNewCase] = useState<Omit<Case, 'id' | 'created'> & { description: string }>({
    title: '',
    status: 'Active',
    priority: 'Medium',
    assignedTo: '',
    description: ''
  });

  // Filtered cases
  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? caseItem.status === statusFilter : true;
    const matchesPriority = priorityFilter ? caseItem.priority === priorityFilter : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Define columns
  const columns: GridColDef<Case>[] = [
    { 
      field: 'id', 
      headerName: 'Case ID', 
      width: 150,
      renderCell: (params) => (
        <Tooltip title="View case details">
          <Button 
            color="primary" 
            onClick={() => console.log(`View case ${params.value}`)}
            sx={{ textTransform: 'none' }}
          >
            {params.value as string}
          </Button>
        </Tooltip>
      )
    },
    { 
      field: 'title', 
      headerName: 'Case Title', 
      width: 300,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value as string}
        </Typography>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Badge
          color={
            params.value === 'Active' ? 'primary' :
            params.value === 'Escalated' ? 'error' : 'warning'
          }
          variant="dot"
          sx={{ mr: 1 }}
        >
          {params.value as string}
        </Badge>
      )
    },
    { field: 'created', headerName: 'Created', width: 150 },
    { 
      field: 'assignedTo', 
      headerName: 'Assigned To', 
      width: 200,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value as string}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Delete case">
            <IconButton 
              size="small" 
              onClick={() => handleDeleteClick(params.row.id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Escalate case">
            <IconButton 
              size="small" 
              onClick={() => handleEscalateClick(params.row.id)}
            >
              <EscalatorWarning fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  // Handlers
  const handleDeleteClick = (caseId: string) => {
    setCaseToDelete(caseId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (caseToDelete) {
      setCases(cases.filter(c => c.id !== caseToDelete));
      setNotification({ 
        open: true, 
        message: 'Case deleted successfully', 
        severity: 'success' 
      });
    }
    setOpenDeleteDialog(false);
    setCaseToDelete(null);
  };

  const handleEscalateClick = (caseId: string) => {
    setCases(cases.map(c => 
      c.id === caseId ? { ...c, status: 'Escalated' } : c
    ));
    setNotification({ 
      open: true, 
      message: 'Case escalated', 
      severity: 'warning' 
    });
  };

  const handleBulkDelete = () => {
    setCases(cases.filter(c => !selectedCases.includes(c.id)));
    setSelectedCases([]);
    setNotification({ 
      open: true, 
      message: `${selectedCases.length} cases deleted`, 
      severity: 'success' 
    });
  };

  const handleBulkEscalate = () => {
    setCases(cases.map(c => 
      selectedCases.includes(c.id) ? { ...c, status: 'Escalated' } : c
    ));
    setNotification({ 
      open: true, 
      message: `${selectedCases.length} cases escalated`, 
      severity: 'warning' 
    });
    setSelectedCases([]);
  };

  const handleCreateCase = () => {
    const newCaseItem: Case = {
      id: `C-${new Date().getFullYear()}-${String(cases.length + 1).padStart(3, '0')}`,
      title: newCase.title,
      status: newCase.status,
      priority: newCase.priority,
      created: new Date().toLocaleDateString(),
      assignedTo: newCase.assignedTo,
      description: newCase.description
    };
    
    setCases([newCaseItem, ...cases]);
    setOpenCreateModal(false);
    setNewCase({
      title: '',
      status: 'Active',
      priority: 'Medium',
      assignedTo: '',
      description: ''
    });
    setNotification({ 
      open: true, 
      message: 'New case created successfully', 
      severity: 'success' 
    });
  };

  const handleRefresh = () => {
    setNotification({ 
      open: true, 
      message: 'Data refreshed', 
      severity: 'info' 
    });
  };

  return (
    <Box className="case-list-container">
      {/* Header Section */}
      <Box className="case-list-header">
        <Typography variant="h4" className="page-title">
          Case Management
        </Typography>
        <Box className="action-buttons">
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => setOpenCreateModal(true)}
            className="new-case-button"
          >
            New Case
          </Button>
          <CSVLink 
            data={filteredCases} 
            filename="forensic_cases.csv"
            className="csv-link"
          >
            <Button 
              variant="outlined" 
              startIcon={<FileDownload />}
              className="export-button"
            >
              Export
            </Button>
          </CSVLink>
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} className="refresh-button">
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Filters Section */}
      <Paper className="filters-section">
        <Box className="search-filter">
          <TextField
            label="Search cases"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Box className="dropdown-filters">
          <FormControl size="small" className="status-filter">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value as string)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Escalated">Escalated</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className="priority-filter">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value as string)}
            >
              <MenuItem value="">All Priorities</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          <Button 
            variant="outlined" 
            startIcon={<FilterAlt />}
            onClick={() => {
              setStatusFilter('');
              setPriorityFilter('');
              setSearchTerm('');
            }}
            className="clear-filters"
          >
            Clear Filters
          </Button>
        </Box>
      </Paper>

      {/* Bulk Actions */}
      {selectedCases.length > 0 && (
        <Paper className="bulk-actions">
          <Typography variant="subtitle1">
            {selectedCases.length} case(s) selected
          </Typography>
          <Box className="bulk-buttons">
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={handleBulkDelete}
              className="bulk-delete"
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<EscalatorWarning />}
              onClick={handleBulkEscalate}
              className="bulk-escalate"
            >
              Escalate
            </Button>
          </Box>
        </Paper>
      )}

      {/* Data Grid */}
      <Paper className="data-grid-container">
        <DataGrid
          rows={filteredCases}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          checkboxSelection
          onSelectionModelChange={(newSelection: GridSelectionModel) => 
            setSelectedCases(newSelection as string[])
          }
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          className="data-grid"
        />
      </Paper>

      {/* Create Case Modal */}
      <Modal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        className="create-modal"
      >
        <Paper className="modal-content">
          <Box className="modal-header">
            <Typography variant="h6">Create New Case</Typography>
            <IconButton onClick={() => setOpenCreateModal(false)}>
              <Close />
            </IconButton>
          </Box>

          <Grid container spacing={2} className="modal-form">
            <Grid item xs={12}>
              <TextField
                label="Case Title"
                variant="outlined"
                fullWidth
                value={newCase.title}
                onChange={(e) => setNewCase({...newCase, title: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newCase.status}
                  onChange={(e) => setNewCase({...newCase, status: e.target.value as 'Active' | 'Pending' | 'Escalated'})}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Escalated">Escalated</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newCase.priority}
                  onChange={(e) => setNewCase({...newCase, priority: e.target.value as 'High' | 'Medium' | 'Low'})}
                  label="Priority"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Assigned To"
                variant="outlined"
                fullWidth
                value={newCase.assignedTo}
                onChange={(e) => setNewCase({...newCase, assignedTo: e.target.value})}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={newCase.description}
                onChange={(e) => setNewCase({...newCase, description: e.target.value})}
              />
            </Grid>

            <Grid item xs={12}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleCreateCase}
                disabled={!newCase.title || !newCase.assignedTo}
                className="create-button"
              >
                Create Case
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        className="delete-dialog"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this case? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleConfirmDelete} 
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
        onClose={() => setNotification({...notification, open: false})}
        message={notification.message}
        className={`snackbar ${notification.severity}`}
      />
    </Box>
  );
};

export default CaseListPage;