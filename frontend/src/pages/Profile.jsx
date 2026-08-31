import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setMonthlyIncome(user.monthly_income || 0);
    }
  }, [user]);

  const initial = user?.name ? user.name.substring(0, 2).toUpperCase() : "US";

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");
    try {
      await updateProfile(monthlyIncome);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Profile</h1>
      </div>

      <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 max-w-4xl transition-colors">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
            {initial}
          </div>
          <div>
            <h2 className="font-bold text-slate-800 dark:text-slate-200">{user?.name || "User"}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email || "email@example.com"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
            <input 
              type="text" 
              defaultValue={user?.name || ""}
              className="w-full border border-slate-200 dark:border-slate-700 bg-transparent dark:bg-slate-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-200 transition-colors"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <input 
              type="text" 
              defaultValue={user?.email || ""}
              className="w-full border border-slate-200 dark:border-slate-700 bg-transparent dark:bg-slate-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-200 transition-colors"
              readOnly
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Monthly Income (₹)</label>
          <input 
            type="number" 
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 bg-transparent dark:bg-slate-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-200 transition-colors"
            placeholder="e.g. 50000"
          />
          <p className="text-xs text-slate-500 mt-2">Used to calculate your budget recommendations and savings goals.</p>
        </div>

        {message && (
          <div className={`mb-4 text-sm font-medium ${message.includes("success") ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
            {message}
          </div>
        )}

        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </div>
  );
}