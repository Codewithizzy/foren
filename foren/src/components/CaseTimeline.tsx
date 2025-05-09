import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Collapse,
  Button,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import {
  Event,
  CheckCircle,
  Warning,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import jsPDF from 'jspdf';

interface TimelineEvent {
  id: number;
  date: string;
  event: string;
  type: 'info' | 'success' | 'warning';
  description: string;
}

interface CaseTimelineProps {
  caseId: string;
}

const CaseTimeline: React.FC<CaseTimelineProps> = ({ caseId }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await new Promise<TimelineEvent[]>((resolve) =>
          setTimeout(() => {
            resolve([
              {
                id: 1,
                date: '2023-05-15 09:30',
                event: 'Case Opened',
                type: 'info',
                description: 'Initial report received from Officer Smith',
              },
              {
                id: 2,
                date: '2023-05-15 11:45',
                event: 'Evidence Collected',
                type: 'success',
                description: 'Footwear impressions and DNA samples collected',
              },
              {
                id: 3,
                date: '2023-05-16 14:20',
                event: 'Tamper Alert',
                type: 'warning',
                description: 'Unauthorized access to evidence locker detected',
              },
            ]);
          }, 1000)
        );
        setEvents(response);
        setError(null);
      } catch (err) {
        setError('Failed to load timeline data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [caseId]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'warning':
        return <Warning color="warning" />;
      default:
        return <Event color="primary" />;
    }
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGeneratePDFReport = () => {
    const doc = new jsPDF();
    const printDate = new Date().toLocaleString();

    // Optional: Insert a forensics-themed background image (base64 or URL)
    // doc.addImage('data:image/jpeg;base64,...', 'JPEG', 0, 0, 210, 297);

    doc.setFontSize(16);
    doc.text(`Case Report`, 10, 15);
    doc.setFontSize(12);
    doc.text(`Case ID: ${caseId}`, 10, 25);
    doc.text(`Printed on: ${printDate}`, 10, 32);

    let y = 42;

    events.forEach((event, index) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${event.event}`, 10, y);
      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.text(`Date: ${event.date}`, 10, y);
      y += 6;

      const lines = doc.splitTextToSize(event.description, 180);
      doc.text(`Details:`, 10, y);
      y += 6;
      doc.text(lines, 10, y);
      y += lines.length * 6;

      y += 5;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`Case_${caseId}_Report.pdf`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Case Timeline
        </Typography>
        <Button variant="contained" onClick={handleGeneratePDFReport}>
          Generate PDF Report
        </Button>
      </Box>

      <Timeline>
        {events.map((item, index) => (
          <TimelineItem key={item.id}>
            <TimelineSeparator>
              <TimelineDot>{getIcon(item.type)}</TimelineDot>
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2">{item.event}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.date}
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => toggleExpand(item.id)}>
                  {expanded[item.id] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>

              <Collapse in={expanded[item.id]} timeout="auto" unmountOnExit>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.description}
                </Typography>
              </Collapse>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default CaseTimeline;
