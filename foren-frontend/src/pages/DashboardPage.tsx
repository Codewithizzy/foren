import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import CaseStatusChart from '../components/CaseStatusChart';
import ActivityTimeline from '../components/ActivityTimeline';
import RecentCases from '../components/RecentCases';
import './DashboardPage.css';

const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({
          caseStatus: 'Success',
          activityTimeline: ['Activity 1', 'Activity 2', 'Activity 3'],
          recentCases: ['Case 1', 'Case 2', 'Case 3'],
        });
      } else {
        reject('Failed to fetch data');
      }
    }, 2000);
  });
};

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
        <Typography className="loading-text">Loading dashboard data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Forensic Dashboard
      </Typography>

      <Box className="dashboard-grid">
        <Box className="dashboard-card">
          <Paper>
            <Typography variant="h6" gutterBottom className="card-title">
              Case Status Overview
            </Typography>
            <CaseStatusChart data={data.caseStatus} />
          </Paper>
        </Box>

        <Box className="dashboard-card">
          <Paper>
            <Typography variant="h6" gutterBottom className="card-title">
              Recent Activity
            </Typography>
            <ActivityTimeline data={data.activityTimeline} />
          </Paper>
        </Box>

        <Box className="dashboard-card">
          <Paper>
            <Typography variant="h6" gutterBottom className="card-title">
              Your Recent Cases
            </Typography>
            <RecentCases data={data.recentCases} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;