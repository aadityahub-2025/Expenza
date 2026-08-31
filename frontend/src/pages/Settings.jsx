import { FaChevronDown } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Settings</h1>
      </div>

      <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm max-w-3xl">
        
        {/* Dark Mode */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Dark Mode</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Toggle between light and dark themes.</p>
          </div>
          <button 
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-indigo-500' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Currency */}
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-2">Currency</h3>
          <div className="relative max-w-sm">
            <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400">
              <option>₹ Indian Rupee</option>
              <option>$ US Dollar</option>
              <option>€ Euro</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          </div>
        </div>

        {/* Language */}
        <div className="p-6">
          <h3 className="font-semibold text-slate-800 mb-2">Language</h3>
          <div className="relative max-w-sm mb-2">
            <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400">
              <option>English</option>
              <option>Spanish</option>
              <option>Hindi</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          </div>
          <p className="text-xs text-slate-400">Note: Language preference is saved but UI is currently English-only.</p>
        </div>

      </div>

    </div>
  );
}