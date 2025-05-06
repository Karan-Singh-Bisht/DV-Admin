import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Circular Progress Gauge Component using Recharts
const HalfPie = ({ percentage = 78 }) => {
  // Calculate the data for the progress gauge
  const data = [
    { name: "Progress", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  // Colors for the gauge
  const COLORS = ["url(#progressGradient)", "#1A1E38"];

  return (
    <div className="h-20 w-full mb-2 flex relative justify-center">
      <div className="absolute w-[10vw] h-[10vw]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFA62E" />
                <stop offset="50%" stopColor="#FF5E62" />
                <stop offset="100%" stopColor="#FF428E" />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              startAngle={180}
              endAngle={0}
              innerRadius="80%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Percentage text in the middle */}
        <div className="absolute inset-0 flex mt-12 justify-center">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default HalfPie;
