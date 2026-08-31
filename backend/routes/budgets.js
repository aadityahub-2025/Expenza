const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Budget = require("../models/Budget");
const router = express.Router();

router.use(authMiddleware);

// Get all budgets for logged in user
router.get("/", async (req, res) => {
  try {
    const rows = await Budget.find({ user_id: req.user.id });
    const budgets = {};
    rows.forEach(row => {
      budgets[row.category] = row.amount;
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update or add a budget
router.post("/", async (req, res) => {
  const { category, amount } = req.body;
  if (!category || amount === undefined) {
    return res.status(400).json({ message: "Category and amount required" });
  }

  try {
    const budget = await Budget.findOneAndUpdate(
      { user_id: req.user.id, category },
      { amount },
      { new: true, upsert: true }
    );
    res.json({ message: "Budget saved successfully", category: budget.category, amount: budget.amount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
