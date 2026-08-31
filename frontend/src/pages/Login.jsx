import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Left Side - Blue Theme Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#3b4de0] text-white p-12 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="flex items-center gap-2 relative z-10">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3-3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-wide">Expenza</span>
        </div>
        
        <div className="max-w-lg mb-20 relative z-10">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Expenza
          </h1>
          <p className="text-indigo-100 text-lg leading-relaxed max-w-md">
            Beautiful, real-time visualisations of every rupee you earn and spend — with AI insights and budgets that actually work.
          </p>
        </div>

        <div className="text-indigo-200 text-sm font-medium relative z-10">
          © 2026 Expenza
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 md:p-12 lg:p-24 bg-white relative">
        <div className="max-w-sm w-full mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Sign in</h2>
          <p className="text-slate-500 mb-8">Welcome back — let's manage your money.</p>

          {errorMsg && <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-2 shadow-sm"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            New here?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Create account
            </Link>
          </p>
          
          <p className="mt-8 text-center text-xs text-slate-400">
            Demo: admin@expensetracker.com/Admin@123
          </p>
        </div>
      </div>

    </div>
  );
}
