import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { token } = useAuth();

  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "👋 Hello! I'm your AI Expense Assistant. Ask me about your spending, budgets, savings, or predictions!",
    },
  ]);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message to backend API
  const sendMessage = async () => {
    if (!message.trim() || !token) return;

    const userMessage = {
      sender: "You",
      text: message,
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiReply = {
          sender: "AI",
          text: data.response,
        };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        const aiError = {
          sender: "AI",
          text: "Sorry, I had trouble processing that. Please try again!",
        };
        setMessages((prev) => [...prev, aiError]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const aiError = {
        sender: "AI",
        text: "⚠️ Connection error. Please check your backend URL in the app configuration.",
      };
      setMessages((prev) => [...prev, aiError]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-28 right-8 w-16 h-16 rounded-full bg-purple-600 text-white shadow-2xl flex items-center justify-center text-2xl z-50"
      >
        <FaRobot />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="fixed bottom-28 right-28 w-96 bg-[#151f38] rounded-2xl shadow-2xl border border-slate-700 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center">
              <h2 className="font-bold text-lg">
                🤖 AI Assistant
              </h2>

              <FaTimes
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl ${
                    msg.sender === "AI"
                      ? "bg-slate-700 text-slate-100"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  <strong>{msg.sender}</strong>
                  <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              ))}
              {loading && (
                <div className="p-3 rounded-xl bg-slate-700 flex items-center gap-2">
                  <FaSpinner className="animate-spin text-indigo-400" />
                  <span className="text-slate-400 text-sm">AI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex border-t border-slate-700">
              <input
                type="text"
                placeholder="Ask about expenses, budget, savings..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                className="flex-1 bg-transparent p-4 outline-none text-white placeholder-slate-500 disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) sendMessage();
                }}
              />

              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="px-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <FaPaperPlane className={loading ? "animate-pulse" : ""} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}