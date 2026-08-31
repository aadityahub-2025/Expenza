const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const User = require("../models/User");
const router = express.Router();

router.use(authMiddleware);

// AI Chat Endpoint - Get smart responses with user data context
router.post("/", async (req, res) => {
  const { message } = req.body;
  
  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Fetch user data for context
    const user = await User.findById(req.user.id);
    const expenses = await Expense.find({ user_id: req.user.id });
    const budgets = await Budget.find({ user_id: req.user.id });

    // Calculate statistics
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const monthlyIncome = user?.monthly_income || 0;
    const savings = monthlyIncome - totalExpense;

    // Category totals
    const categoryTotals = {};
    expenses.forEach((exp) => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    // Get highest category
    const highestCategory = Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) => 
          categoryTotals[a] > categoryTotals[b] ? a : b
        )
      : "None";

    const response = generateResponse(message, {
      totalExpense,
      monthlyIncome,
      savings,
      categoryTotals,
      highestCategory,
      expenseCount: expenses.length,
      budgetCount: budgets.length,
    });

    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

// Smart response generation based on user data
function generateResponse(userMessage, userData) {
  const text = userMessage.toLowerCase();
  const {
    totalExpense,
    monthlyIncome,
    savings,
    categoryTotals,
    highestCategory,
    expenseCount,
    budgetCount,
  } = userData;

  // Greeting responses
  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return `👋 Hello! I'm your AI Expense Assistant. I can see you've made ${expenseCount} transactions so far. What would you like to know about your finances?`;
  }

  // Expense/Spending queries
  if (text.includes("how much") || text.includes("total expense") || text.includes("spent")) {
    return `💰 You've spent ₹${totalExpense.toLocaleString()} in total. Your highest spending is in **${highestCategory}** with ₹${categoryTotals[highestCategory]?.toLocaleString() || 0}. Would you like to reduce this?`;
  }

  // Savings queries
  if (text.includes("how much saving") || text.includes("can i save") || text.includes("savings")) {
    return `💵 You currently have savings of ₹${savings.toLocaleString()}. ${
      savings > monthlyIncome * 0.2
        ? `✅ Great! You're saving more than 20% of your income.`
        : `⚠️ You might want to increase savings. Aim for 20% of your income (₹${Math.round(monthlyIncome * 0.2).toLocaleString()}).`
    }`;
  }

  // Budget help
  if (text.includes("budget") || text.includes("limit")) {
    return `📊 You have ${budgetCount} category budgets set. I recommend using the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings. Visit Budget Planner to set or adjust your limits!`;
  }

  // Income queries
  if (text.includes("income") || text.includes("earn")) {
    return `💼 Your monthly income is ₹${monthlyIncome.toLocaleString()}. ${
      monthlyIncome > 0
        ? `Your expense-to-income ratio is ${((totalExpense / monthlyIncome) * 100).toFixed(1)}%.`
        : `Please update your monthly income in Profile settings.`
    }`;
  }

  // Category-specific insights
  if (text.includes("category") || text.includes("spending by")) {
    const categories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat, amount]) => `**${cat}**: ₹${amount.toLocaleString()}`)
      .join(", ");
    return `📈 Top 3 spending categories: ${categories}. Would you like to reduce spending in any category?`;
  }

  // Predictions
  if (text.includes("predict") || text.includes("forecast") || text.includes("next month")) {
    const predictedExpense = Math.round(totalExpense * 1.05);
    return `🔮 Based on your spending pattern, next month you'll likely spend around ₹${predictedExpense.toLocaleString()} (5% inflation factor included). Check the Predictions page for detailed analysis!`;
  }

  // AI Insights
  if (text.includes("insight") || text.includes("advice") || text.includes("recommendation")) {
    return `🤖 Visit the AI Insights page for personalized financial recommendations based on the 50/30/20 budgeting rule. You'll get smart tips to optimize your spending!`;
  }

  // Help request
  if (text.includes("help") || text.includes("what can you do")) {
    return `🎯 I can help you with:\n✔ Expense tracking\n✔ Budget planning\n✔ Savings goals\n✔ Spending analysis\n✔ Financial predictions\n\nAsk me anything like "how much did I spend?" or "what's my savings?"`;
  }

  // Default response
  return `I'm here to help! You can ask me about your expenses, budgets, savings, or financial predictions. What would you like to know? 🤖`;
}

module.exports = router;
