import { FaTriangleExclamation } from "react-icons/fa6";

export default function BudgetAlert() {
  return (
    <div className="bg-red-500/10 border border-red-500 rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <FaTriangleExclamation className="text-red-400 text-3xl" />

        <div>
          <h2 className="text-xl font-bold text-red-400">
            Budget Alert
          </h2>

          <p className="text-gray-300 mt-2">
            You have used 82% of your monthly budget.
          </p>
        </div>
      </div>
    </div>
  );
}