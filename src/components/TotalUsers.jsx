import { useState } from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 p-2 rounded shadow-lg text-white">
        <p className="text-sm font-medium">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Active Users Chart Component
const TotalUsers = () => {
  const [data] = useState([
    { name: "Jan", value: 10 },
    { name: "Feb", value: 20 },
    { name: "Mar", value: 35 },
    { name: "Apr", value: 25 },
    { name: "May", value: 30 },
    { name: "Jun", value: 20 },
    { name: "Jul", value: 40 },
    { name: "Aug", value: 55 },
    { name: "Sep", value: 40 },
    { name: "Oct", value: 25 },
  ]);

  return (
    <div className="h-20 w-full my-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <Tooltip content={CustomTooltip} cursor={false} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00E676"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#00E676",
              stroke: "#004D27",
              strokeWidth: 2,
            }}
            filter="url(#glow)"
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalUsers;
