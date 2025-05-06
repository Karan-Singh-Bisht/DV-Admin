import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#151A3A] border border-[#252B4A] p-2 flex gap-2 grounded shadow-lg text-white text-xs">
        <p className="font-medium">{`${label}`}</p>
        <p className="font-medium">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function MonthlyRevenue() {
  const [data] = useState([
    { month: "Jan", revenue: 12 },
    { month: "Feb", revenue: 40 },
    { month: "Mar", revenue: 33 },
    { month: "Apr", revenue: 50 },
    { month: "May", revenue: 24 },
    { month: "Jun", revenue: 18 },
    { month: "Jul", revenue: 20 },
    { month: "Aug", revenue: 33 },
    { month: "Sep", revenue: 14 },
  ]);

  return (
    <div className="py-6 pr-6 rounded-xl w-full">
      <div className="h-[25vw] sm:h-64 w-full">
        <ResponsiveContainer width="110%" height="110%">
          <BarChart data={data} margin={{ top: 5, right: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#00BFFF" />
                <stop offset="100%" stopColor="#00FFBF" />
              </linearGradient>
            </defs>
            <Tooltip content={CustomTooltip} cursor={false} />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#333355"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9999AA", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9999AA", fontSize: 12 }}
              width={30}
            />
            <Bar dataKey="revenue" radius={[4, 4, 0, 0]} barSize={30}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="url(#barGradient)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
