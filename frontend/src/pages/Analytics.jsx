import { useState } from "react";
import { useExpense } from "../context/ExpenseContext";
import BarChartComponent from "../components/BarChartComponent";
import PieChartComponent from "../components/PieChartComponent";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("Monthly");
  const { expenses, totalIncome, totalExpense } = useExpense();

  const thisMonthExpenses = expenses.filter(e => e.date.startsWith(new Date().toISOString().substring(0, 7)));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Reports</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Deep-dive into your spending patterns.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["Monthly", "Yearly", "Category"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 min-h-[400px] transition-colors">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6">Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-slate-100 dark:border-slate-700 rounded-xl p-6 shadow-sm bg-slate-50 dark:bg-slate-800/50">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">TOTAL INCOME</p>
            <h3 className="text-2xl font-bold text-emerald-500">₹{totalIncome.toLocaleString()}</h3>
          </div>
          
          <div className="border border-slate-100 dark:border-slate-700 rounded-xl p-6 shadow-sm bg-slate-50 dark:bg-slate-800/50">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">TOTAL EXPENSE</p>
            <h3 className="text-2xl font-bold text-rose-500">₹{totalExpense.toLocaleString()}</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Monthly Analysis</h3>
            <BarChartComponent />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Category Analysis</h3>
            <PieChartComponent />
          </div>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-8 text-center">{thisMonthExpenses.length} transactions this month</p>
      </div>

    </div>
  );
}