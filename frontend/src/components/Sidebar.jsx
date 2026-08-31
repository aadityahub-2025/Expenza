import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaChartPie,
  FaWallet,
  FaChartBar,
  FaRobot,
  FaBrain,
  FaPiggyBank,
  FaUserCircle,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", icon: <FaChartPie />, path: "/" },
  { name: "Transactions", icon: <FaWallet />, path: "/transactions" },
  { name: "Budget", icon: <FaPiggyBank />, path: "/budget" },
  { name: "Reports", icon: <FaChartBar />, path: "/analytics" },
  { name: "AI Insights", icon: <FaRobot />, path: "/ai" },
  { name: "Profile", icon: <FaUserCircle />, path: "/profile" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
];

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[#1f2937] border-r border-slate-100 dark:border-slate-800 flex flex-col transition-colors">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-indigo-600 text-white p-2 rounded-lg flex items-center justify-center w-8 h-8 font-bold">
            E
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">
            Expenza
          </h1>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-5 py-3.5 rounded-2xl mx-4 transition-all duration-300 text-sm font-semibold relative overflow-hidden ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                    : "text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Hover background bubble */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 origin-left rounded-2xl"></div>
                  )}
                  <span className={`text-xl relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`}>
                    {item.icon}
                  </span>
                  <span className="relative z-10">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button 
          onClick={logout}
          className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors w-full px-4 py-2"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;