"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface DoughnutChartData {
  name: string;
  value: number;
}

interface DoughnutChartProps {
  data: DoughnutChartData[];
}

const colorPalette = [
  "#55DDE0",
  "#33658A",
  "#2F4858",
  "#F6AE2D",
  "#F26419"
];

export default function ChartsDoughnut({ data }: DoughnutChartProps) {
  return (
    <ResponsiveContainer width={"100%"} minHeight={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="60%"
          outerRadius="80%"
          paddingAngle={3}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
