import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Active', value: 12 },
  { name: 'Closed', value: 8 },
  { name: 'Pending', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export const CaseStatusChart = () => {
  return (
    <Box sx={{ height: 300 }}>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Case Status Distribution
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};