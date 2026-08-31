import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useExpense } from "../context/ExpenseContext";

export default function AddExpenseModal({ open, onClose }) {
  const { addExpense } = useExpense();

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addExpense(form);

    setForm({
      title: "",
      category: "",
      amount: "",
      date: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-[#151f38] rounded-2xl w-[500px] p-6 border border-slate-700">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Add Expense
          </h2>

          <FaTimes
            className="cursor-pointer text-white"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
            required
          >
            <option value="">Select Category</option>
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Transport</option>
            <option>Others</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-bold"
          >
            Add Expense
          </button>

        </form>

      </div>

    </div>
  );
}