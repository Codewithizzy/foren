import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import './CaseStatusChart.css';

interface CaseData {
  id: number;
  name: string;
  status: string;
}

const COLORS = ['#4dabf5', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

// Sample dataset
const sampleCases: CaseData[] = [
  { id: 1, name: 'Case A', status: 'Active' },
  { id: 2, name: 'Case B', status: 'Closed' },
  { id: 3, name: 'Case C', status: 'Pending' },
  { id: 4, name: 'Case D', status: 'Closed' },
  { id: 5, name: 'Case E', status: 'Active' },
  { id: 6, name: 'Case F', status: 'Escalated' },
  { id: 7, name: 'Case G', status: 'Review' },
  { id: 8, name: 'Case H', status: 'Active' },
  { id: 9, name: 'Case I', status: 'Pending' },
  { id: 10, name: 'Case J', status: 'Escalated' },
  { id: 11, name: 'Case K', status: 'Closed' },
  { id: 12, name: 'Case L', status: 'Active' },
];

const CaseStatusDashboard: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 5;

  // Get filtered data
  const filteredCases = useMemo(() => {
    return filter === 'All'
      ? sampleCases
      : sampleCases.filter((c) => c.status === filter);
  }, [filter]);

  const totalPages = Math.ceil(filteredCases.length / rowsPerPage);
  const paginatedCases = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredCases.slice(start, start + rowsPerPage);
  }, [page, filteredCases]);

  // Chart aggregation
  const chartData = useMemo(() => {
    const counts: { [status: string]: number } = {};
    filteredCases.forEach((c) => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredCases]);

  return (
    <Box className="case-dashboard-container">
      <Typography variant="h6" gutterBottom className="case-dashboard-title" textAlign="center">
        Case Status Dashboard
      </Typography>

      {/* Filter */}
      <Box className="filter-container">
        <Typography variant="subtitle2" className="filter-label">Filter by Status:</Typography>
        <Select
          size="small"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="filter-select"
          sx={{ ml: 1, minWidth: 150 }}
        >
          <MenuItem value="All">All</MenuItem>
          {[...new Set(sampleCases.map((c) => c.status))].map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Chart */}
      <Box className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={({ name, percent }: { name: string; percent: number }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} className="case-table">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Case ID</TableCell>
              <TableCell>Case Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCases.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box className="pagination-container">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CaseStatusDashboard;