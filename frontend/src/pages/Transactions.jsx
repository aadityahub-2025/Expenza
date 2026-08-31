import { useExpense } from "../context/ExpenseContext";
import ExpenseTable from "../components/ExpenseTable";

export default function Transactions() {
  const { expenses } = useExpense();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">All Transactions</h2>
      </div>

      <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <ExpenseTable />
        {expenses.length === 0 && (
          <div className="text-center py-10 text-slate-500 dark:text-slate-400">
            No transactions found. Add a new expense to see it here.
          </div>
        )}
      </div>
    </div>
  );
}