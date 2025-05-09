import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Divider,
  Chip,
  Snackbar
} from '@mui/material';
import {
  Save,
  Cancel,
  Refresh,
  HelpOutline,
  FileCopy,
  Spellcheck,
  History,
  AutoFixHigh
} from '@mui/icons-material';

interface StatementGeneratorProps {
  initialStatement: string;
  onSave?: (content: string) => void;
  onCancel?: () => void;
  onGenerate?: (prompt: string) => Promise<string>;
}

const StatementGenerator: React.FC<StatementGeneratorProps> = ({
  initialStatement,
  onSave = () => {},
  onCancel = () => {},
  onGenerate
}) => {
  const [statement, setStatement] = useState(initialStatement);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editHistory, setEditHistory] = useState<string[]>([initialStatement]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    setStatement(initialStatement);
    setEditHistory([initialStatement]);
    setHistoryIndex(0);
  }, [initialStatement]);

  const handleStatementChange = (newValue: string) => {
    setStatement(newValue);
    if (editHistory[editHistory.length - 1] !== newValue) {
      setEditHistory([...editHistory, newValue]);
      setHistoryIndex(editHistory.length);
    }
  };

  const generateStatement = async () => {
    if (!statement.trim()) {
      setError('Please provide some initial content or select a template');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      let generatedContent = '';
      if (onGenerate) {
        generatedContent = await onGenerate(statement);
      } else {
        generatedContent = `AI-Generated Content:\n\nBased on your input: "${statement.substring(0, 50)}..."\n\nThe court should consider that...`;
      }

      handleStatementChange(generatedContent);
      setSuccess('Statement generated successfully');
    } catch (err) {
      setError('Failed to generate statement. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    onSave(statement);
    setSuccess('Statement saved successfully');
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setStatement(editHistory[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < editHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setStatement(editHistory[newIndex]);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(statement);
    setSuccess('Copied to clipboard');
  };

  const handleFormatText = () => {
    const formatted = statement
      .replace(/\n\s*\n/g, '\n\n')
      .replace(/([.:])\s*(?=\S)/g, '$1 ');
    handleStatementChange(formatted);
    setSuccess('Text formatted');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        
        <Tooltip title="Help with statement generation">
          <IconButton>
            <HelpOutline />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          onClick={generateStatement}
          disabled={isGenerating}
          startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoFixHigh />}
        >
          {isGenerating ? 'Generating...' : 'AI Enhance'}
        </Button>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Undo">
          <span>
            <IconButton onClick={handleUndo} disabled={historyIndex <= 0}>
              <History />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Redo">
          <span>
            <IconButton onClick={handleRedo} disabled={historyIndex >= editHistory.length - 1}>
              <Refresh />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Format text">
          <IconButton onClick={handleFormatText}>
            <Spellcheck />
          </IconButton>
        </Tooltip>

        <Tooltip title="Copy to clipboard">
          <IconButton onClick={handleCopyToClipboard}>
            <FileCopy />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
        <TextField
          fullWidth
          multiline
          minRows={10}
          maxRows={20}
          value={statement}
          onChange={(e) => handleStatementChange(e.target.value)}
          placeholder="Start typing or select a template..."
          sx={{
            '& .MuiInputBase-root': {
              alignItems: 'flex-start',
            }
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Chip label={`Characters: ${statement.length}`} size="small" variant="outlined" />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" onClick={onCancel} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!statement.trim()}
            startIcon={<Save />}
          >
            Save Statement
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        message={success}
      />
    </Box>
  );
};

export default StatementGenerator;
