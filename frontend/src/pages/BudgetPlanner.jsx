import { useState, useEffect } from "react";
import { useExpense } from "../context/ExpenseContext";
import toast, { Toaster } from 'react-hot-toast';

const CATEGORIES = [
  "Food", "Shopping", "Travel", "Bills", 
  "Entertainment", "Transport", "Others"
];

export default function BudgetPlanner() {
  const { budgets, updateBudget, expenses } = useExpense();
  const [localBudgets, setLocalBudgets] = useState({});

  useEffect(() => {
    setLocalBudgets(budgets);
  }, [budgets]);

  const handleLimitChange = (category, value) => {
    setLocalBudgets({ ...localBudgets, [category]: value });
  };

  const handleSave = async () => {
    for (const category of CATEGORIES) {
      if (localBudgets[category] !== undefined && localBudgets[category] !== budgets[category]) {
        await updateBudget(category, localBudgets[category]);
      }
    }
    toast.success("Budgets saved successfully!");
  };

  const getCategorySpent = (category) => {
    return expenses
      .filter((e) => e.category === category)
      .reduce((sum, item) => sum + item.amount, 0);
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((category) => {
            const spent = getCategorySpent(category);
            const limit = localBudgets[category] || 0;
            const progress = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
            const isOver = limit > 0 && spent > limit;

            return (
              <div key={category} className="border border-slate-100 dark:border-slate-700 rounded-xl p-5 flex flex-col justify-between hover:border-indigo-100 dark:hover:border-indigo-500 transition-colors shadow-sm bg-slate-50 dark:bg-slate-800/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">{category}</h3>
                    <p className={`text-xs mt-1 ${isOver ? 'text-red-500 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                      ₹{spent.toLocaleString()} spent
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <input
                      type="number"
                      placeholder="Set limit"
                      className="w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-indigo-400 dark:focus:border-indigo-500 text-right shadow-inner dark:text-slate-200 transition-colors"
                      value={localBudgets[category] || ""}
                      onChange={(e) => handleLimitChange(category, e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${isOver ? 'bg-red-500' : 'bg-indigo-500'} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-full text-sm font-semibold shadow-md transition-colors"
          >
            Save Budgets
          </button>
        </div>
      </div>
    </div>
  );
}