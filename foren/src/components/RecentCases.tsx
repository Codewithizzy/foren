import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Chip, TextField, InputAdornment, Select, MenuItem, FormControl, Button } from '@mui/material';
import { Folder } from '@mui/icons-material';
import './RecentCases.css';

interface CaseItem {
  id: string;
  title: string;
  status: string;
  modified: string;
}

interface RecentCasesProps {
  data: CaseItem[];
}

const RecentCases: React.FC<RecentCasesProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<CaseItem[]>(data);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const filtered = data.filter((caseItem) => {
      const caseTitle = caseItem.title || '';
      const caseStatus = caseItem.status || '';

      return (
        (caseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedStatus === '' || caseStatus.toLowerCase() === selectedStatus.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchQuery, selectedStatus, data]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box className="recent-cases-container">
      <TextField
        className="case-search-field"
        label="Search Cases"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Folder />
            </InputAdornment>
          ),
        }}
      />

      <FormControl fullWidth className="status-filter">
        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Filter by Status' }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>

      {filteredData.length === 0 ? (
        <Box className="no-cases-message">No cases found with the selected filters.</Box>
      ) : (
        <List className="case-list">
          {paginatedData.map((caseItem) => {
            const caseStatus = caseItem.status || 'Unknown';
            const caseTitle = caseItem.title || 'Untitled';

            return (
              <Box key={caseItem.id}>
                <ListItem className="case-list-item">
                  <Folder sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText
                    className="case-text"
                    primary={<span className="case-title">{caseTitle}</span>}
                    secondary={<span className="case-subtext">Case ID: {caseItem.id} • Modified: {caseItem.modified}</span>}
                  />
                  <Chip 
                    className={`status-chip ${caseStatus.toLowerCase() === 'active' ? 'status-chip-active' : 'status-chip-default'}`}
                    label={caseStatus} 
                    size="small" 
                  />
                </ListItem>
                <Divider className="case-list-divider" />
              </Box>
            );
          })}
        </List>
      )}

      {/* Pagination */}
      <Box className="pagination-container">
        <Button
          className="pagination-button"
          variant="contained"
          disabled={page === 1}
          onClick={() => handleChangePage(page - 1)}
        >
          Previous
        </Button>
        <Button
          className="pagination-button"
          variant="contained"
          disabled={page === Math.ceil(filteredData.length / itemsPerPage)}
          onClick={() => handleChangePage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default RecentCases;