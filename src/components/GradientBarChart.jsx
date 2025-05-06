import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 2 },
  { name: "Feb", value: 5 },
  { name: "Mar", value: 9 },
  { name: "Apr", value: 12 },
  { name: "May", value: 15 },
  { name: "Jun", value: 18 },
  { name: "Jul", value: 20 },
  { name: "Aug", value: 24 },
];

const GradientBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff00cc" />
            <stop offset="100%" stopColor="#3333ff" />
          </linearGradient>
        </defs>
        <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="value"
          radius={[10, 10, 0, 0]}
          fill="url(#barGradient)"
          barSize={12}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GradientBarChart;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#1f1f1f",
          border: "1px solid #ccc",
          paddingTop: "10px",
          paddingRight: "12px",
          paddingLeft: "12px",
          paddingBottom: "10px",
          borderRadius: "5px",
          color: "#fff",
        }}
      >
        <p>{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
