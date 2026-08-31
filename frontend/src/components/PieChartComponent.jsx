import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useExpense } from "../context/ExpenseContext";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];

export default function PieChartComponent() {
  const { expenses } = useExpense();

  const categoryData = Object.values(
    expenses.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          name: item.category,
          value: 0,
        };
      }

      acc[item.category].value += Number(item.amount);

      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          label
        >
          {categoryData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}