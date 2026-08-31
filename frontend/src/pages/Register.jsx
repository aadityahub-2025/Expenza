import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import emailjs from '@emailjs/browser';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name || !email || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      if (serviceId === "YOUR_SERVICE_ID" || serviceId === "your_service_id_here") {
        console.warn("EmailJS credentials not set. Using fallback OTP: 123456");
        setGeneratedOtp("123456");
        setShowOtpForm(true);
        setIsLoading(false);
        return;
      }

      const templateParams = {
        to_name: name,
        to_email: email,
        otp: otp,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setShowOtpForm(true);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setErrorMsg("Failed to send OTP email. Please check your configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (otpInput === generatedOtp) {
      setIsLoading(true);
      try {
        await register(name, email, password, monthlyIncome);
        navigate("/");
      } catch (err) {
        setErrorMsg(err.message);
        setIsLoading(false);
      }
    } else {
      setErrorMsg("Invalid OTP. Please try again.");
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
            Join thousands of users who have transformed their financial habits with our intuitive expense tracking tools.
          </p>
        </div>

        <div className="text-indigo-200 text-sm font-medium relative z-10">
          © 2026 Expenza
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 md:p-12 lg:p-24 bg-white relative">
        <div className="max-w-sm w-full mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Create an account</h2>
          <p className="text-slate-500 mb-8">Sign up to get started with Expenza.</p>

          {errorMsg && <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm">{errorMsg}</div>}

          {!showOtpForm ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                  placeholder="John Doe"
                  required
                />
              </div>

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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Income (₹) <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input 
                  type="number" 
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                  placeholder="e.g. 50000"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="bg-indigo-50 text-indigo-700 p-4 rounded-lg text-sm mb-6 border border-indigo-100">
                We've sent a 6-digit one-time password to <span className="font-semibold">{email}</span>. Please enter it below to verify your email.
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Verification Code</label>
                <input 
                  type="text" 
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-center text-2xl tracking-widest outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-300"
                  placeholder="000000"
                  maxLength="6"
                  required
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowOtpForm(false)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Verify & Sign up"}
                </button>
              </div>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
