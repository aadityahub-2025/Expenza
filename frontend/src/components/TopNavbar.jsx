import { FaMoon, FaSun, FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const TopNavbar = ({ onAddClick }) => {
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="flex items-center justify-between px-8 py-5 bg-white dark:bg-[#1f2937] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10 transition-colors">
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Welcome back,</p>
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">{user?.name || "User"}</h2>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleDarkMode}
          className="text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          {isDarkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
        </button>
        <button 
          onClick={onAddClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-all"
        >
          <FaPlus />
          Add
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
