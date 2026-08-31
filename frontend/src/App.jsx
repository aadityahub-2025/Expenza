import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import BudgetPlanner from "./pages/BudgetPlanner";
import AIInsights from "./pages/AIInsights";
import Predictions from "./pages/Predictions";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="budget" element={<BudgetPlanner />} />
        <Route path="ai" element={<AIInsights />} />
        <Route path="prediction" element={<Predictions />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}