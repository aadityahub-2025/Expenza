import { useState } from "react";
import { FaRobot, FaChartLine, FaSync } from "react-icons/fa";
import { useExpense } from "../context/ExpenseContext";

const Predictions = () => {
  const { expenses, totalExpense, totalIncome } = useExpense();
  const [prediction, setPrediction] = useState(null);

  // Calculate predictive analytics
  const calculatePrediction = () => {
    if (expenses.length === 0) {
      setPrediction({
        predicted: 0,
        current: 0,
        trend: "No data",
        savings: totalIncome,
      });
      return;
    }

    // Calculate category-wise spending
    const categoryTotals = {};
    expenses.forEach((exp) => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    // Predict next month (simple average increase of 5% based on inflation trend)
    const predictedExpense = Math.round(totalExpense * 1.05);
    const predictedSavings = Math.max(0, totalIncome - predictedExpense);
    const spendingTrend = totalExpense > 0 ? "Growing" : "No data";

    setPrediction({
      predicted: predictedExpense,
      current: totalExpense,
      trend: spendingTrend,
      savings: predictedSavings,
      categories: categoryTotals,
    });
  };

  // Auto-calculate on load
  if (!prediction && expenses.length > 0) {
    calculatePrediction();
  }

  const pred = prediction || { predicted: 0, current: 0, trend: "No data", savings: 0, categories: {} };

  const topCategories = Object.entries(pred.categories || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="p-8 text-white bg-[#0b1220] rounded-2xl min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-6">
        AI Expense Prediction
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Prediction Card */}
        <div className="bg-[#1b2238] p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaRobot className="text-4xl text-cyan-400" />
            <h2 className="text-2xl font-semibold">Next Month Prediction</h2>
          </div>

          <p className="text-gray-400 mb-4">
            Based on your current spending of ₹{pred.current.toLocaleString()}, 
            we predict next month's expenses.
          </p>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400">Predicted Total Expense</p>
              <h1 className="text-5xl font-bold text-cyan-400">
                ₹{pred.predicted.toLocaleString()}
              </h1>
            </div>
            <div>
              <p className="text-sm text-gray-400">Predicted Savings</p>
              <p className="text-2xl font-bold text-green-400">
                ₹{pred.savings.toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={calculatePrediction}
            className="mt-6 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition flex items-center gap-2"
          >
            <FaSync /> Recalculate
          </button>
        </div>

        {/* ML Analysis */}
        <div className="bg-[#1b2238] p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-4xl text-pink-400" />
            <h2 className="text-2xl font-semibold">ML Analysis</h2>
          </div>

          <ul className="space-y-3 text-sm text-gray-300">
            {expenses.length > 0 ? (
              <>
                <li>✔ Current spending trend: {pred.trend}</li>
                <li>✔ Predicted increase: ~5% (inflation factor)</li>
                <li>
                  ✔ Top category: {topCategories[0]?.[0]} (₹{topCategories[0]?.[1].toLocaleString()})
                </li>
                <li>
                  {pred.savings > totalIncome * 0.2
                    ? "✔ Savings target ACHIEVABLE"
                    : "⚠ Savings target NEEDS ATTENTION"}
                </li>
                <li className="text-xs text-gray-500 mt-4">
                  💡 Tip: Based on your {topCategories.length} spending categories
                </li>
              </>
            ) : (
              <li className="text-gray-400">Add expenses to see predictions</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Predictions;