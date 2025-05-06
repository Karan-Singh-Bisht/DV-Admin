import { useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#151A3A] border border-[#252B4A] p-2 rounded shadow-lg text-white text-xs">
        <p className="font-medium">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Gradient Line Chart Component
const TotalAccounts = () => {
  const [data] = useState([
    { name: "Mon", value: 30 },
    { name: "Tue", value: 15 },
    { name: "Wed", value: 25 },
    { name: "Thu", value: 45 },
    { name: "Fri", value: 20 },
    { name: "Sat", value: 35 },
  ]);

  return (
    <div className="h-24 w-full my-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#00BFFF" />
            </linearGradient>
          </defs>
          <Tooltip content={CustomTooltip} cursor={false} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#colorGradient)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={4}
                  stroke="#FF1493"
                  strokeWidth={2}
                  fill="#0A0F2B"
                />
              );
            }}
            activeDot={{
              r: 6,
              fill: "#FF1493",
              stroke: "#0A0F2B",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalAccounts;
