import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useExpense } from "../context/ExpenseContext";

export default function BarChartComponent() {
  const { expenses } = useExpense();

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyExpense = {};

  expenses.forEach((expense) => {
    const month = new Date(expense.date).getMonth();
    const name = months[month];

    if (!monthlyExpense[name]) {
      monthlyExpense[name] = 0;
    }

    monthlyExpense[name] += Number(expense.amount);
  });

  const chartData = months.map((month) => ({
    month,
    expense: monthlyExpense[month] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Bar
          dataKey="expense"
          fill="#6366f1"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}