import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Car, Bus, Bike, Train, Battery, ShoppingBag, Trash2, Leaf } from "lucide-react";

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

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("⚠️ You must be logged in to save data!");
      return;
    }

    if (
      distance < 0 ||
      electricityUnits < 0 ||
      vegMeals < 0 ||
      nonVegMeals < 0 ||
      shopping < 0 ||
      waste < 0
    ) {
      alert("❌ Inputs cannot be negative!");
      return;
    }

    const payload = {
      userId,
      date,
      travel: {
        type: travelType,
        fuel: fuelType,
        km: distance ? Number(distance) : 0,
      },
      electricity: {
        units: electricityUnits ? Number(electricityUnits) : 0,
      },
      meals: {
        veg: vegMeals ? Number(vegMeals) : 0,
        nonVeg: nonVegMeals ? Number(nonVegMeals) : 0,
      },
      shopping: {
        amount: shopping ? Number(shopping) : 0,
      },
      waste: {
        quantity: waste ? Number(waste) : 0,
      },
    };

    try {
      await axios.post("http://localhost:5000/api/daily-input", payload);
      alert("✅ Daily input saved successfully!");
      setDistance("");
      setFuelType("");
      setTravelType("");
      setElectricityUnits("");
      setVegMeals("");
      setNonVegMeals("");
      setShopping("");
      setWaste("");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong while saving!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
      {/* Floating eco icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Leaf, Car, Bike, Battery, ShoppingBag, Trash2].map((Icon, i) => (
          <Icon
            key={i}
            className="absolute text-green-300 opacity-20 animate-float"
            size={40}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative p-8 max-w-2xl w-full bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌍 Daily Input</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">📅 Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Travel */}
          <div className="p-4 rounded-xl bg-green-50">
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              🚗 Travel Type
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
                  type="number"
                  min="0"
                  placeholder="Distance (km)"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="border p-3 rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Electricity */}
          <div>
            <label className="block text-sm font-medium mb-2">⚡ Electricity Units</label>
            <input
              type="number"
              min="0"
              placeholder="Enter monthly units"
              value={electricityUnits}
              onChange={(e) => setElectricityUnits(e.target.value)}
              className="w-full border p-3 rounded-lg"
              disabled={new Date(date).getDate() !== 3}
            />
            {new Date(date).getDate() !== 3 && (
              <p className="text-xs text-gray-500 mt-1">
                ⚠️ Electricity input is only allowed on the 3rd of each month.
              </p>
            )}
          </div>

          {/* Meals */}
          <div className="bg-yellow-50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">🍽️ Meals</h3>
            <div className="flex gap-4">
              <input
                type="number"
                min="0"
                placeholder="Veg meals"
                value={vegMeals}
                onChange={(e) => setVegMeals(e.target.value)}
                className="p-3 rounded-lg border w-full"
              />
              <input
                type="number"
                min="0"
                placeholder="Non-Veg meals"
                value={nonVegMeals}
                onChange={(e) => setNonVegMeals(e.target.value)}
                className="p-3 rounded-lg border w-full"
              />
            </div>
          </div>

          {/* Shopping */}
          <div>
            <label className="block text-sm font-medium mb-1">🛍️ Shopping (₹)</label>
            <input
              type="number"
              min="0"
              placeholder="Enter amount spent"
              value={shopping}
              onChange={(e) => setShopping(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Waste */}
          <div>
            <label className="block text-sm font-medium mb-1">🗑️ Waste (kg)</label>
            <input
              type="number"
              min="0"
              placeholder="Enter waste in kg"
              value={waste}
              onChange={(e) => setWaste(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            ✅ Save Daily Input
          </button>
        </form>
      </div>

      {/* floating animation style */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default DailyInput;

