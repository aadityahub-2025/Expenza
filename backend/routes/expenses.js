const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Expense = require("../models/Expense");
const router = express.Router();

router.use(authMiddleware);

// Get all expenses for logged in user
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ user_id: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new expense
router.post("/", async (req, res) => {
  const { title, category, amount, date } = req.body;
  if (!title || !category || !amount || !date) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const expense = await Expense.create({
      user_id: req.user.id,
      title,
      category,
      amount,
      date
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
