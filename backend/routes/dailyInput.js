// backend/routes/dailyInput.js
const express = require("express");
const router = express.Router();
const DailyInput = require("../models/DailyInput");

// helper for YYYY-MM-DD format
function formatDate(dateStr) {
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj)) return dateStr;
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(
    dateObj.getDate()
  ).padStart(2, "0")}`;
}

// Save or update daily input
router.post("/", async (req, res) => {
  try {
    let { userId, date, travel, electricity, meals, shopping, waste } = req.body;
    if (!userId || !date) {
      return res.status(400).json({ error: "Missing userId or date" });
    }

    const formattedDate = formatDate(date);

    const entry = await DailyInput.findOneAndUpdate(
      { userId, date: formattedDate },
      {
        userId,
        date: formattedDate,
        travel: {
          mode: travel?.mode || "",
          type: travel?.type || "",
          km: travel?.km || travel?.distance || 0,
        },
        electricity: { units: electricity?.units || 0 },
        meals: { veg: meals?.veg || 0, nonVeg: meals?.nonVeg || 0 },
        shopping: { amount: shopping?.amount || 0 },
        waste: { quantity: waste?.quantity || 0 },
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: entry });
  } catch (error) {
    console.error("❌ Error saving daily input:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get specific date input
router.get("/:userId/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;
    const formattedDate = formatDate(date);
    const entry = await DailyInput.findOne({ userId, date: formattedDate });

    if (!entry) return res.status(404).json({ error: "No data found" });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get monthly inputs
router.get("/:userId/month/:month", async (req, res) => {
  try {
    const { userId, month } = req.params;
    const entries = await DailyInput.find({
      userId,
      date: { $regex: `^${month}` },
    }).sort({ date: 1 });

    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
