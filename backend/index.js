// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dailyInputRoutes = require("./routes/dailyInput");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/carbon-footprint", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/daily-input", dailyInputRoutes);

// Test route
app.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
