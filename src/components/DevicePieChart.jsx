import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mobile", value: 25 },
  { name: "Laptop", value: 15 },
  { name: "PC", value: 20 },
  { name: "MacBook", value: 8 },
];

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

const COLORS = ["#FF6B6B", "#FF8C00", "#00D084", "#4D96FF"];

const renderCenterText = () => (
  <text
    x="50%"
    y="50%"
    textAnchor="middle"
    dominantBaseline="middle"
    fontSize="20"
    fill="#fff"
  >
    <tspan x="50%" dy="-0.2em" fontSize="26" fontWeight="bold">
      68%
    </tspan>
    <tspan x="50%" dy="1.5em" fontSize="16">
      Total Views
    </tspan>
  </text>
);

const DevicePieChart = () => {
  return (
    <div className="h-auto w-full bg-[#0c1027] flex flex-col items-center py-4">
      <ResponsiveContainer width={270} height={270}>
        <PieChart>
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4D96FF" />
              <stop offset="25%" stopColor="#00D084" />
              <stop offset="50%" stopColor="#FF6B6B" />
              <stop offset="75%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#4D96FF" />
            </linearGradient>
          </defs>

          <Tooltip content={CustomTooltip} />

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            startAngle={90}
            endAngle={-270}
            paddingAngle={1}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {renderCenterText()}
        </PieChart>
      </ResponsiveContainer>

      {/* Legend below the chart */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-white text-xs">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicePieChart;
