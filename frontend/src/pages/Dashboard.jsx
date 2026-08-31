import { useState } from "react";
import SummaryCard from "../components/SummaryCard";
import { useExpense } from "../context/ExpenseContext";

// Placeholders for charts
import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import LineChartComponent from "../components/LineChartComponent";

// Minimal expense table placeholder if we don't have the new one yet
import ExpenseTable from "../components/ExpenseTable";

export default function Dashboard() {
  const { expenses, totalIncome, totalExpense, savings } = useExpense();
  
  // Calculate today's expense
  const today = new Date().toISOString().split('T')[0];
  const todaysExpense = expenses
    .filter(e => e.date === today)
    .reduce((sum, item) => sum + item.amount, 0);

  // Calculate monthly expense
  const currentMonth = today.substring(0, 7);
  const monthlyExpense = expenses
    .filter(e => e.date.startsWith(currentMonth))
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="TOTAL INCOME" value={`₹${totalIncome.toLocaleString()}`} valueColor="text-green-500" />
        <SummaryCard title="TOTAL EXPENSE" value={`₹${totalExpense.toLocaleString()}`} valueColor="text-rose-500" />
        <SummaryCard title="CURRENT BALANCE" value={`₹${savings.toLocaleString()}`} />
        <SummaryCard title="TODAY'S EXPENSE" value={`₹${todaysExpense.toLocaleString()}`} />
        
        <SummaryCard title="MONTHLY EXPENSE" value={`₹${monthlyExpense.toLocaleString()}`} />
        <SummaryCard title="SAVINGS" value={`₹${savings.toLocaleString()}`} />
        <SummaryCard title="BUDGET REMAINING" value="₹0" />
        <SummaryCard title="TRANSACTIONS" value={expenses.length.toString()} />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/60 dark:bg-[#1f2937]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/40 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[300px] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Expense by Category
          </h3>
          <div className="flex items-center justify-center h-full">
            <PieChartComponent />
          </div>
        </div>
        <div className="bg-white/60 dark:bg-[#1f2937]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/40 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[300px] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Income vs Expense
          </h3>
          <div className="flex items-center justify-center h-full">
            <BarChartComponent />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="space-y-8">
          <div className="bg-white/60 dark:bg-[#1f2937]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/40 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[250px] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Monthly Trend
            </h3>
            <div className="flex items-center justify-center h-full">
              <LineChartComponent />
            </div>
          </div>
          <div className="bg-white/60 dark:bg-[#1f2937]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/40 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[250px] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Weekly Spending
            </h3>
            <div className="flex items-center justify-center h-full">
              <BarChartComponent />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-3xl shadow-lg text-white transform hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
              ✨ AI Insights
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Your spending is well optimized this week! You've saved 15% more compared to last month. Keep it up!
            </p>
          </div>

          <div className="bg-white/60 dark:bg-[#1f2937]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/40 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Recent Transactions
            </h3>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <ExpenseTable />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}