// src/pages/Dashboard/MonthlySummary.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const emissionFactors = {
  travel: { car: 0.12, bus: 0.05, bike: 0.06, flight: 0.25 },
  electricity: 0.85,
  meals: { veg: 0.5, nonVeg: 2.0 },
  shopping: 0.03,
  waste: 0.9,
};

const COLORS = {
  travel: "#60a5fa",
  electricity: "#facc15",
  meals: "#34d399",
  shopping: "#a78bfa",
  waste: "#f87171",
};

const MonthlySummary = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const month = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/daily-input/${currentUser.uid}/month/${month}`
        );
        const entries = res.data || [];

        const processed = entries.map((entry) => {
          const travelType = entry.travel?.type || "car";
          const travelKm = Number(entry.travel?.km || 0);
          const travelEmission =
            travelKm * (emissionFactors.travel[travelType] || 0);

          const elecEmission =
            Number(entry.electricity?.units || 0) * emissionFactors.electricity;

          const mealEmission =
            (Number(entry.meals?.veg) || 0) * emissionFactors.meals.veg +
            (Number(entry.meals?.nonVeg) || 0) * emissionFactors.meals.nonVeg;

          const shoppingEmission =
            Number(entry.shopping?.amount || 0) * emissionFactors.shopping;

          const wasteEmission =
            Number(entry.waste?.quantity || 0) * emissionFactors.waste;

          return {
            date: entry.date,
            travel: travelEmission,
            electricity: elecEmission,
            meals: mealEmission,
            shopping: shoppingEmission,
            waste: wasteEmission,
            total:
              travelEmission +
              elecEmission +
              mealEmission +
              shoppingEmission +
              wasteEmission,
          };
        });

        setData(processed);
      } catch (err) {
        console.error("Error fetching monthly data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser, month]);

  if (loading)
    return <p className="text-center p-6 text-gray-600">Loading...</p>;
  if (!data.length)
    return (
      <p className="text-center p-6 bg-white shadow rounded-lg">
        No data found for {month}.
      </p>
    );

  const totals = data.reduce(
    (acc, d) => {
      acc.travel += d.travel;
      acc.electricity += d.electricity;
      acc.meals += d.meals;
      acc.shopping += d.shopping;
      acc.waste += d.waste;
      acc.total += d.total;
      return acc;
    },
    { travel: 0, electricity: 0, meals: 0, shopping: 0, waste: 0, total: 0 }
  );

  const pieData = [
    { name: "Travel", value: totals.travel, color: COLORS.travel },
    { name: "Electricity", value: totals.electricity, color: COLORS.electricity },
    { name: "Meals", value: totals.meals, color: COLORS.meals },
    { name: "Shopping", value: totals.shopping, color: COLORS.shopping },
    { name: "Waste", value: totals.waste, color: COLORS.waste },
  ];

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <h2 className="text-3xl font-bold text-green-700 text-center">
        📅 Monthly Summary ({month})
      </h2>

      {/* Daily Total Emissions Line Chart */}
      <motion.div
        className="bg-white shadow rounded-lg p-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="text-lg font-semibold mb-2 text-center">
          📈 Daily Total Emissions
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#4ade80" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category Contribution Bar Chart */}
      <motion.div
        className="bg-white shadow rounded-lg p-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="text-lg font-semibold mb-2 text-center">
          📊 Category Contribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="travel" stackId="a" fill={COLORS.travel} />
            <Bar dataKey="electricity" stackId="a" fill={COLORS.electricity} />
            <Bar dataKey="meals" stackId="a" fill={COLORS.meals} />
            <Bar dataKey="shopping" stackId="a" fill={COLORS.shopping} />
            <Bar dataKey="waste" stackId="a" fill={COLORS.waste} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Monthly Totals */}
      <motion.div
        className="bg-white shadow rounded-2xl p-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-center">🌍 Total Emissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(totals)
            .filter(([key]) => key !== "total")
            .map(([key, value]) => (
              <p key={key} className="text-gray-700 text-lg">
                <span style={{ color: COLORS[key] }}>
                  {key === "travel"
                    ? "🚗"
                    : key === "electricity"
                    ? "⚡"
                    : key === "meals"
                    ? "🍽️"
                    : key === "shopping"
                    ? "🛍️"
                    : "🗑️"}{" "}
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </span>{" "}
                {value.toFixed(2)} kg CO₂
              </p>
            ))}
        </div>
        <p className="text-center font-bold mt-4 text-green-700">
          🌱 Total: {totals.total.toFixed(2)} kg CO₂
        </p>
      </motion.div>

      {/* Doughnut Chart */}
      <motion.div
        className="bg-white shadow rounded-lg p-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-center">
          🍩 Category Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default MonthlySummary;
