import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchUserProfile();
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        logout();
      }
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    throw new Error(data.message);
  };

  const register = async (name, email, password, monthly_income) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, monthly_income })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    throw new Error(data.message || data.error);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const updateProfile = async (monthly_income) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ monthly_income: Number(monthly_income) })
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        return true;
      }
      throw new Error("Failed to update profile");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
