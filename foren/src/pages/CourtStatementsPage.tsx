import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton
} from '@mui/material';
import { Clear, HelpOutline } from '@mui/icons-material';
import StatementGenerator from '../components/StatementGenerator';
import StatementTemplates from '../components/StatementTemplates'; // still used as a button

const CourtStatementsPage: React.FC = () => {
  const [generatorContent, setGeneratorContent] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTemplateSelect = (templateContent: string) => {
    setGeneratorContent(templateContent);
  };

  const handleClearTemplate = () => {
    setGeneratorContent('');
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        maxWidth: '1800px',
        margin: '0 auto',
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Court Statement Preparation
        </Typography>
        <Tooltip title="Use the template button to insert sample text">
          <IconButton aria-label="help">
            <HelpOutline />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Template Button */}
      <Box sx={{ mb: 2 }}>
        <StatementTemplates onTemplateSelect={handleTemplateSelect} />
      </Box>

      {/* Generator Panel */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Statement Generator
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Clear />}
            onClick={handleClearTemplate}
            disabled={!generatorContent}
            aria-label="Clear template"
          >
            Clear
          </Button>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <StatementGenerator
            initialStatement={generatorContent}
            key={generatorContent}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default CourtStatementsPage;
