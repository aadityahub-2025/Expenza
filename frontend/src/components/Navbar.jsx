import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
      <h2 className="text-2xl font-bold">
        AI Expense Tracker Dashboard
      </h2>

      <div className="flex items-center gap-5">
        <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-white"
          />
        </div>

        <FaBell size={22} />

        <FaUserCircle size={34} />
      </div>
    </header>
  );
};

export default Navbar;