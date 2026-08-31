import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
 YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useExpense } from "../context/ExpenseContext";

export default function LineChartComponent() {
  const { expenses } = useExpense();

  const sorted = [...expenses].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sorted.map((expense) => ({
    date: expense.date,
    amount: Number(expense.amount),
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#10b981"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}