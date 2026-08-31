import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import AddExpenseModal from "../components/AddExpenseModal";

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#111827] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <TopNavbar onAddClick={() => setIsModalOpen(true)} />

        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>

      <AddExpenseModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MainLayout;