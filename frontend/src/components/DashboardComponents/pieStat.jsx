// 

import { useTheme } from "@mui/material/styles";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function PieChartStat({ completed, incomplete }) {
    const theme = useTheme();

    const data = [
        { name: "Completed", value: completed },
        { name: "Incomplete", value: incomplete },
    ];

    const COLORS = [theme.palette.primary.main, theme.palette.primary.light];

    const renderLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

    return (
        <ResponsiveContainer width="100%" height={160} style={{ marginBottom: 20 }}>
        <PieChart>
            {/* Define a subtle drop shadow filter */}
            <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2"
                floodColor="rgba(0,0,0,0.2)"
                />
            </filter>
            </defs>

            <Pie
            data={data}
            cx="48%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            label={renderLabel}
            filter="url(#shadow)" // apply shadow filter to the Pie
            animationDuration={600}
            >
            {data.map((entry, index) => (
                <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                stroke={theme.palette.background.paper}
                strokeWidth={2}
                />
            ))}
            </Pie>

            <Tooltip
            contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 4,
                fontSize: 12,
                color: theme.palette.text.primary,
            }}
            itemStyle={{
                color: theme.palette.text.primary,
            }}
            />

            <Legend
            verticalAlign="bottom"
            align="center"
            iconSize={10}
            wrapperStyle={{
                fontSize: 12,
                lineHeight: "2em",
                top: 140,
                left: 0,
                color: theme.palette.text.primary,
            }}
            iconType="circle"
            />
        </PieChart>
        </ResponsiveContainer>
    );
}
