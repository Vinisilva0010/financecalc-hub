"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type ChartType = "bar" | "line" | "pie";

interface ChartWrapperProps {
  type: ChartType;
  data: Array<Record<string, string | number>>;
  xKey: string;
  yKeys: Array<{ key: string; label: string; color: string }>;
  title?: string;
  height?: number;
}

const COLORS = ["#000000", "#facc15", "#6d28d9", "#2563eb", "#dc2626", "#16a34a"];

export default function ChartWrapper({
  type,
  data,
  xKey,
  yKeys,
  title,
  height = 300,
}: ChartWrapperProps) {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 12, fontWeight: 700, fill: "#000" }}
                axisLine={{ stroke: "#000", strokeWidth: 2 }}
                tickLine={{ stroke: "#000", strokeWidth: 2 }}
              />
              <YAxis
                tick={{ fontSize: 12, fontWeight: 700, fill: "#000" }}
                axisLine={{ stroke: "#000", strokeWidth: 2 }}
                tickLine={{ stroke: "#000", strokeWidth: 2 }}
              />
              <Tooltip
                contentStyle={{
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0 #000",
                  fontWeight: 700,
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", fontWeight: 700 }}
              />
              {yKeys.map((y) => (
                <Bar
                  key={y.key}
                  dataKey={y.key}
                  name={y.label}
                  fill={y.color}
                  stroke="#000"
                  strokeWidth={2}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 12, fontWeight: 700, fill: "#000" }}
                axisLine={{ stroke: "#000", strokeWidth: 2 }}
                tickLine={{ stroke: "#000", strokeWidth: 2 }}
              />
              <YAxis
                tick={{ fontSize: 12, fontWeight: 700, fill: "#000" }}
                axisLine={{ stroke: "#000", strokeWidth: 2 }}
                tickLine={{ stroke: "#000", strokeWidth: 2 }}
              />
              <Tooltip
                contentStyle={{
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0 #000",
                  fontWeight: 700,
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", fontWeight: 700 }}
              />
              {yKeys.map((y) => (
                <Line
                  key={y.key}
                  type="monotone"
                  dataKey={y.key}
                  name={y.label}
                  stroke={y.color}
                  strokeWidth={3}
                  dot={{ fill: y.color, stroke: "#000", strokeWidth: 2, r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey={yKeys[0]?.key || "value"}
                nameKey={xKey}
                stroke="#000"
                strokeWidth={2}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0 #000",
                  fontWeight: 700,
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", fontWeight: 700 }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-black uppercase tracking-tight text-black">
          {title}
        </h3>
      )}
      <div className="border-[4px] border-black bg-white p-4">
        {renderChart()}
      </div>
    </div>
  );
}