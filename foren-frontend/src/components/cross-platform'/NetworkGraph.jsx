import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export const NetworkGraph = () => {
  // Mock data for the graph
  const graphData = useMemo(() => {
    const nodes = [
      { id: 'john', name: 'John', group: 1 },
      { id: 'jane', name: 'Jane', group: 1 },
      { id: 'phone1', name: 'iPhone 12', group: 2 },
      { id: 'email1', name: 'john@example.com', group: 3 },
    ];
    
    const links = [
      { source: 'john', target: 'jane', value: 5 },
      { source: 'john', target: 'phone1', value: 3 },
      { source: 'john', target: 'email1', value: 3 },
    ];
    
    return { nodes, links };
  }, []);

  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="subtitle1" gutterBottom>
        Communication Network
      </Typography>
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="group"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.1}
      />
    </Box>
  );
};