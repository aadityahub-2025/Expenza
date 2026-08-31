import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState({});
  const { token, user } = useAuth();

  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchBudgets();
    } else {
      setExpenses([]);
      setBudgets({});
    }
  }, [token]);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await fetch(`${API_URL}/api/budgets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBudgets(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addExpense = async (expense) => {
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          title: expense.title,
          category: expense.category,
          amount: Number(expense.amount),
          date: expense.date
        })
      });
      if (res.ok) {
        const newExpense = await res.json();
        setExpenses([newExpense, ...expenses]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setExpenses((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateBudget = async (category, amount) => {
    try {
      const res = await fetch(`${API_URL}/api/budgets`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ category, amount: Number(amount) })
      });
      if (res.ok) {
        setBudgets(prev => ({ ...prev, [category]: Number(amount) }));
      }
    } catch (err) {
      console.error(err);
    }
  };


  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = user?.monthly_income || 0; 
  const savings = totalIncome - totalExpense;

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        budgets,
        addExpense,
        deleteExpense,
        updateBudget,
        totalIncome,
        totalExpense,
        savings,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);