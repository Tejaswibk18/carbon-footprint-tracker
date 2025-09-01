// backend/models/DailyInput.js
const mongoose = require("mongoose");

const DailyInputSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true }, // format: YYYY-MM-DD

  travel: {
    mode: { type: String, default: "" }, // car, bus, bike, flight
    type: { type: String, default: "" }, // petrol, diesel, EV
    km: { type: Number, default: 0 },
  },

  electricity: {
    units: { type: Number, default: 0 },
  },

  meals: {
    veg: { type: Number, default: 0 },
    nonVeg: { type: Number, default: 0 },
  },

  shopping: {
    amount: { type: Number, default: 0 },
  },

  waste: {
    quantity: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("DailyInput", DailyInputSchema);
