import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "A", value: 25 },
  { name: "B", value: 15 },
  { name: "C", value: 20 },
  { name: "D", value: 8 },
]; // Total = 68 (you can adjust accordingly)

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

const COLORS = ["#FF6B6B", "#FF8C00", "#00D084", "#4D96FF"]; // Gradient-like effect

const RADIAN = Math.PI / 180;

const renderCenterText = () => (
  <text
    x="50%"
    y="50%"
    textAnchor="middle"
    dominantBaseline="middle"
    className="text-center"
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
    <div className="flex justify-center items-center h-[300px] bg-[#0c1027]">
      <PieChart width={270} height={270}>
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
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {renderCenterText()}
      </PieChart>
    </div>
  );
};

export default DevicePieChart;
