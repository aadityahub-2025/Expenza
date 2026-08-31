require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");
const budgetRoutes = require("./routes/budgets");
const chatRoutes = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/chat", chatRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Expenza API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
