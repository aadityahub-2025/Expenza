import { FaTrash, FaEdit } from "react-icons/fa";
import { useExpense } from "../context/ExpenseContext";

export default function ExpenseTable() {
  const { expenses, deleteExpense } = useExpense();

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
              <th className="py-3 font-semibold">Title</th>
              <th className="py-3 font-semibold">Category</th>
              <th className="py-3 font-semibold">Amount</th>
              <th className="py-3 font-semibold">Date</th>
              <th className="py-3 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-600 dark:text-slate-400">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-400">
                  No Expenses Found
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr
                  key={expense._id}
                  className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 font-medium text-slate-800 dark:text-slate-200">{expense.title}</td>
                  <td className="py-4">{expense.category}</td>
                  <td className="py-4 text-rose-500 font-semibold">
                    ₹{Number(expense.amount).toLocaleString()}
                  </td>
                  <td className="py-4">{expense.date}</td>
                  <td className="py-4">
                    <div className="flex justify-center gap-3">
                      <button className="text-indigo-400 hover:text-indigo-600 transition-colors">
                        <FaEdit />
                      </button>
                      <button
                        className="text-rose-400 hover:text-rose-600 transition-colors"
                        onClick={() => deleteExpense(expense._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}