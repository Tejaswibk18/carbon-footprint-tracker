import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Car, Bus, Bike, Train, Battery, ShoppingBag, Trash2, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const DailyInput = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [travelType, setTravelType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [distance, setDistance] = useState("");
  const [electricityUnits, setElectricityUnits] = useState("");
  const [vegMeals, setVegMeals] = useState("");
  const [nonVegMeals, setNonVegMeals] = useState("");
  const [shopping, setShopping] = useState("");
  const [waste, setWaste] = useState("");
  const [userId, setUserId] = useState(null);

  const [carbonPreview, setCarbonPreview] = useState(0);

  // Emission Factors
  const emissionFactors = {
    travel: {
      car: fuelType === "ev" ? 0.05 : fuelType === "diesel" ? 0.27 : 0.24,
      bus: 0.15,
      bike: 0.1,
      train: 0.05,
    },
    electricity: 0.9,
    veg: 0.5,
    nonveg: 2.0,
    shopping: 0.03,
    waste: 1.2,
  };

  // Estimate live emissions preview
  useEffect(() => {
    let sum = 0;
    if (distance && travelType)
      sum += Number(distance) * emissionFactors.travel[travelType];
    if (electricityUnits)
      sum += electricityUnits * emissionFactors.electricity;
    sum += vegMeals * emissionFactors.veg;
    sum += nonVegMeals * emissionFactors.nonveg;
    sum += shopping * emissionFactors.shopping;
    sum += waste * emissionFactors.waste;

    setCarbonPreview(sum.toFixed(2));
  }, [distance, travelType, electricityUnits, vegMeals, nonVegMeals, shopping, waste]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => setUserId(user ? user.uid : null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("⚠ You must be logged in!");
      return;
    }

    const payload = {
      userId,
      date,
      travel: { type: travelType, fuel: fuelType, km: Number(distance) || 0 },
      electricity: { units: Number(electricityUnits) || 0 },
      meals: { veg: Number(vegMeals) || 0, nonVeg: Number(nonVegMeals) || 0 },
      shopping: { amount: Number(shopping) || 0 },
      waste: { quantity: Number(waste) || 0 },
    };

    try {
      await axios.post("http://localhost:5000/api/daily-input", payload);
      alert(`🌱 Saved! You emitted approx ${carbonPreview} kg CO₂ today.`);
      setDistance("");
      setFuelType("");
      setTravelType("");
      setElectricityUnits("");
      setVegMeals("");
      setNonVegMeals("");
      setShopping("");
      setWaste("");
    } catch {
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">

      {/* Floating animated elements */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], x: [-20, 20, -20] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute text-green-200 top-[20%] left-[10%]"
      >
        <Leaf size={60} />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], y: [-20, 20, -20] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute text-green-300 bottom-[15%] right-[15%]"
      >
        <Car size={60} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl w-full bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/50"
      >
        <h2 className="text-4xl font-bold text-green-700 text-center mb-4">
          🌱 Daily Carbon Activity
        </h2>

        {/* Live Emission Preview Badge */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center bg-green-200 text-green-900 py-2 px-4 rounded-xl font-semibold shadow-md mb-6"
        >
          Estimated Emissions: {carbonPreview} kg CO₂
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6 font-medium text-gray-700">

          {/* Date */}
          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              className="w-full border p-3 rounded-lg bg-white"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Travel Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-green-50 rounded-2xl p-5 border border-green-200"
          >
            <label className="text-lg font-semibold flex items-center gap-2 mb-2">
              🚗 Travel Activity
            </label>

            <select
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Type</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="bike">Bike</option>
              <option value="train">Train</option>
            </select>

            {travelType && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="border p-3 rounded-lg"
                >
                  <option value="">Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="ev">EV</option>
                </select>

                <input
                  placeholder="Distance (km)"
                  type="number"
                  min="0"
                  className="border p-3 rounded-lg"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>
            )}
          </motion.div>

          {/* Electricity */}
                       <motion.div
  whileHover={{ scale: 1.02 }}
  className="bg-green-50 p-5 rounded-2xl border border-green-200"
>
  <label className="text-lg font-semibold">⚡ Electricity Usage</label>
  <input
    type="number"
    min="0"
    placeholder={
      new Date(date).getDate() === 3
        ? "Enter electricity units"
        : "Allowed only on 3rd of every month"
    }
    className={`w-full border p-3 rounded-lg ${
      new Date(date).getDate() !== 3 ? "opacity-70 cursor-not-allowed" : ""
    }`}
    disabled={new Date(date).getDate() !== 3}
    value={electricityUnits}
    onChange={(e) => setElectricityUnits(e.target.value)}
  />

  {new Date(date).getDate() !== 3 && (
    <p className="text-xs text-red-500 mt-1 font-medium">
      {/* ❌ Electricity input is restricted. Try again on 3rd. */}
    </p>
  )}
</motion.div>


          {/* Meals */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200">
            <label className="text-lg font-semibold">🍽️ Daily Meals</label>
            <div className="flex gap-4 mt-2">
              <input type="number" min="0" placeholder="Veg" className="border p-3 rounded-lg w-full" value={vegMeals} onChange={(e)=>setVegMeals(e.target.value)} />
              <input type="number" min="0" placeholder="Non-Veg" className="border p-3 rounded-lg w-full" value={nonVegMeals} onChange={(e)=>setNonVegMeals(e.target.value)} />
            </div>
          </motion.div>

          {/* Shopping */}
          <input placeholder="🛍️ Shopping Amount (₹)" type="number" min="0" className="border p-3 rounded-lg w-full" value={shopping} onChange={(e)=>setShopping(e.target.value)} />

          {/* Waste */}
          <input placeholder="🗑️ Waste (kg)" type="number" min="0" className="border p-3 rounded-lg w-full" value={waste} onChange={(e)=>setWaste(e.target.value)} />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-700 text-white text-lg py-3 rounded-xl shadow-lg hover:bg-green-800"
          >
            Save Input 🌍
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default DailyInput;
