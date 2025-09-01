// src/pages/Dashboard/History.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const emissionFactors = {
  travel: 0.12, // per km
  electricity: 0.82, // per unit
  meals: { veg: 0.5, nonVeg: 2.5 }, // per meal
  shopping: 0.02, // per ₹
  waste: 1.5, // per kg
};

export default function History() {
  const { currentUser } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    if (!currentUser?.uid) return;
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/daily-input/${currentUser.uid}/month/${selectedMonth}`
      );
      const data = await res.json();
      setEntries(data || []);
    } catch (err) {
      console.error("❌ Error fetching history:", err);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [currentUser, selectedMonth]);

  // 📂 Export as CSV
  const downloadCSV = () => {
    if (entries.length === 0) return;
    const header = ["Date", "Travel", "KM", "Electricity (units)", "Meals (Veg)", "Meals (Non-Veg)", "Shopping (₹)", "Waste (kg)"];
    const rows = entries.map((entry) => [
      entry.date,
      entry.travel?.type || "N/A",
      entry.travel?.km || 0,
      entry.electricity?.units || 0,
      entry.meals?.veg || 0,
      entry.meals?.nonVeg || 0,
      entry.shopping?.amount || 0,
      entry.waste?.quantity || 0,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `history_${selectedMonth}.csv`;
    link.click();
  };

  // Calculate total emissions per entry
  const calculateEmission = (entry) => {
    const travel = (entry.travel?.km || 0) * emissionFactors.travel;
    const electricity = (entry.electricity?.units || 0) * emissionFactors.electricity;
    const meals =
      (entry.meals?.veg || 0) * emissionFactors.meals.veg +
      (entry.meals?.nonVeg || 0) * emissionFactors.meals.nonVeg;
    const shopping = (entry.shopping?.amount || 0) * emissionFactors.shopping;
    const waste = (entry.waste?.quantity || 0) * emissionFactors.waste;
    return travel + electricity + meals + shopping + waste;
  };

  // Find top emission day
  const topEmission = entries.reduce(
    (max, e) => Math.max(max, calculateEmission(e)),
    0
  );

  // Total monthly emission
  const totalMonthlyEmission = entries.reduce(
    (sum, e) => sum + calculateEmission(e),
    0
  );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-emerald-700 flex items-center gap-2">
          📜 History
        </h2>

        {entries.length > 0 && (
          <button
            onClick={downloadCSV}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition-all"
          >
            ⬇️ Download CSV
          </button>
        )}
      </div>

      {/* Month Selector */}
      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium text-gray-700">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
        />
      </div>

      {entries.length > 0 && (
        <div className="mb-6 p-4 bg-white rounded-xl shadow-md text-center text-green-700 font-semibold">
          🌱 Total Emissions for {selectedMonth}: {totalMonthlyEmission.toFixed(2)} kg CO₂
        </div>
      )}

      {loading ? (
        <p className="text-gray-600 animate-pulse">⏳ Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No history found for <span className="font-semibold">{selectedMonth}</span>.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry, i) => {
            const emission = calculateEmission(entry);
            const isTop = emission === topEmission;

            return (
              <motion.div
                key={entry._id}
                className={`border rounded-2xl p-5 shadow-md hover:shadow-xl transition-all ${
                  isTop ? "ring-2 ring-yellow-400 bg-yellow-50" : "bg-white"
                }`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-bold text-xl text-emerald-600 mb-3 flex items-center justify-between">
                  📅 {entry.date}
                  {isTop && (
                    <span className="ml-2 flex items-center text-yellow-600 font-bold text-sm">
                      🔥 Top Emission
                    </span>
                  )}
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>🚗 <span className="font-medium">Travel:</span> {entry.travel?.type || "N/A"} ({entry.travel?.km || 0} km)</p>
                  <p>⚡ <span className="font-medium">Electricity:</span> {entry.electricity?.units || 0} units</p>
                  <p>🍲 <span className="font-medium">Meals:</span> {entry.meals?.veg || 0} veg, {entry.meals?.nonVeg || 0} non-veg</p>
                  <p>🛍️ <span className="font-medium">Shopping:</span> ₹{entry.shopping?.amount || 0}</p>
                  <p>🗑️ <span className="font-medium">Waste:</span> {entry.waste?.quantity || 0} kg</p>
                  <p className="font-semibold mt-1 text-red-600">Total: {emission.toFixed(2)} kg CO₂</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
