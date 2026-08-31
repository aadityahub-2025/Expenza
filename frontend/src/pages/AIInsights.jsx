import { FaMagic, FaExclamationTriangle, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import { useExpense } from "../context/ExpenseContext";

export default function AIInsights() {
  const { expenses, budgets, savings, totalIncome } = useExpense();

  const getInsights = () => {
    const insights = [];
    
    if (expenses.length === 0) {
      return [{ type: "info", text: "Add your first transaction to see personalized insights.", icon: <FaLightbulb /> }];
    }

    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    const highestCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b);
    
    // Highlight highest category
    insights.push({
      type: "warning",
      text: `You've spent the most on ${highestCategory} (₹${categoryTotals[highestCategory]}). Consider setting a strict budget limit of ₹${Math.max(0, categoryTotals[highestCategory] - 1000)} for this category next month.`,
      icon: <FaExclamationTriangle />
    });

    // 50/30/20 Rule Analysis
    const needsCategories = ["Housing", "Groceries", "Utilities", "Transport", "Healthcare"];
    const wantsCategories = ["Entertainment", "Dining", "Shopping", "Travel"];
    
    let spentOnNeeds = 0;
    let spentOnWants = 0;

    expenses.forEach(exp => {
      if (needsCategories.includes(exp.category)) spentOnNeeds += exp.amount;
      else if (wantsCategories.includes(exp.category)) spentOnWants += exp.amount;
    });

    const income = totalIncome || 0;
    const targetNeeds = income * 0.5;
    const targetWants = income * 0.3;
    const targetSavings = income * 0.2;

    if (income > 0) {
      if (spentOnNeeds > targetNeeds) {
        insights.push({
          type: "warning",
          text: `You have spent ₹${spentOnNeeds} on "Needs". The recommended limit (50% of income) is ₹${targetNeeds}. Try to find cheaper utility plans or grocery alternatives to save ₹${spentOnNeeds - targetNeeds}.`,
          icon: <FaExclamationTriangle />
        });
      }

      if (spentOnWants > targetWants) {
        insights.push({
          type: "danger",
          text: `You are overspending on "Wants" (₹${spentOnWants} spent). To maintain a healthy budget, reduce shopping and dining by at least ₹${spentOnWants - targetWants}.`,
          icon: <FaExclamationTriangle />
        });
      }

      if (savings < targetSavings) {
        insights.push({
          type: "info",
          text: `Your goal is to save 20% of your income (₹${targetSavings}). You are currently short by ₹${targetSavings - savings}. Consider cutting back on ${highestCategory} to reach this goal.`,
          icon: <FaLightbulb />
        });
      } else {
        insights.push({
          type: "success",
          text: `Excellent! You are saving ₹${savings}, beating the recommended 20% goal (₹${targetSavings}). Consider investing this surplus!`,
          icon: <FaCheckCircle />
        });
      }
    }

    // Budget checks
    Object.keys(budgets).forEach(category => {
      const spent = categoryTotals[category] || 0;
      const limit = budgets[category];
      if (limit > 0 && spent > limit) {
        insights.push({
          type: "danger",
          text: `You have exceeded your custom budget for ${category} by ₹${spent - limit}. Stop spending in this category immediately.`,
          icon: <FaExclamationTriangle />
        });
      }
    });

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div className="flex items-center gap-4">
        <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-sm">
          <FaMagic className="text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">AI Insights</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Smart suggestions based on your spending patterns.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4 max-w-3xl">
        {insights.map((insight, index) => {
          let bgColor, textColor, borderColor;
          if (insight.type === "danger") {
            bgColor = "bg-red-50 dark:bg-red-900/20";
            borderColor = "border-red-100 dark:border-red-800/50";
            textColor = "text-red-800 dark:text-red-300";
          } else if (insight.type === "warning") {
            bgColor = "bg-amber-50 dark:bg-amber-900/20";
            borderColor = "border-amber-100 dark:border-amber-800/50";
            textColor = "text-amber-800 dark:text-amber-300";
          } else if (insight.type === "success") {
            bgColor = "bg-emerald-50 dark:bg-emerald-900/20";
            borderColor = "border-emerald-100 dark:border-emerald-800/50";
            textColor = "text-emerald-800 dark:text-emerald-300";
          } else {
            bgColor = "bg-blue-50 dark:bg-blue-900/20";
            borderColor = "border-blue-100 dark:border-blue-800/50";
            textColor = "text-blue-800 dark:text-blue-300";
          }

          return (
            <div key={index} className={`${bgColor} border ${borderColor} rounded-xl p-6 flex items-start gap-4 transition-colors`}>
              <div className={`mt-1 ${textColor}`}>
                {insight.icon}
              </div>
              <div>
                <h3 className={`font-bold mb-1 ${textColor}`}>Insight #{index + 1}</h3>
                <p className={`text-sm ${textColor} opacity-90`}>{insight.text}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}