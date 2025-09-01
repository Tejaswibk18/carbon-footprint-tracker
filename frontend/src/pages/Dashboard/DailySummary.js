// src/pages/Dashboard/DailySummary.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Radar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { motion } from "framer-motion";
import {
  Car,
  Zap,
  Utensils,
  ShoppingBag,
  Trash2,
  Award,
  Lightbulb,
} from "lucide-react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
);

const DailySummary = () => {
  const { currentUser } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emissions, setEmissions] = useState({});
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const factors = {
    travel: 0.21,
    electricity: 0.85,
    vegMeal: 0.5,
    nonVegMeal: 2.0,
    shopping: 0.03,
    waste: 0.9,
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/daily-input/${currentUser.uid}/${today}`
        );
        const data = res.data;
        setSummary(data);

        const calculated = {
          travel: (data.travel?.km || 0) * factors.travel,
          electricity: (data.electricity?.units || 0) * factors.electricity,
          meals:
            (data.meals?.veg || 0) * factors.vegMeal +
            (data.meals?.nonVeg || 0) * factors.nonVegMeal,
          shopping: (data.shopping?.amount || 0) * factors.shopping,
          waste: (data.waste?.quantity || 0) * factors.waste,
        };

        setEmissions(calculated);
      } catch (err) {
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [currentUser, today]);

  if (loading) return <p>Loading...</p>;
  if (!summary) {
    return (
      <div className="text-center p-6 bg-white shadow rounded-lg">
        <p className="text-gray-600">No data found for today ({today}).</p>
      </div>
    );
  }

  const totalEmission = Object.values(emissions).reduce((a, b) => a + b, 0);

  const sorted = Object.entries(emissions).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3).map(([key]) => key);
  const topCategory = sorted[0][0]; // Top emission source

  const suggestions = {
    travel: {
      text: "Try using public transport, carpooling, or walking for shorter distances.",
      icon: <Car className="inline mr-2 text-green-600" />,
    },
    electricity: {
      text: "Save electricity by turning off unused devices and using energy-efficient appliances.",
      icon: <Zap className="inline mr-2 text-blue-600" />,
    },
    meals: {
      text: "Reduce non-veg meals and prefer more plant-based meals.",
      icon: <Utensils className="inline mr-2 text-yellow-600" />,
    },
    shopping: {
      text: "Buy only what’s necessary and prefer eco-friendly products.",
      icon: <ShoppingBag className="inline mr-2 text-purple-600" />,
    },
    waste: {
      text: "Segregate and recycle waste properly to reduce landfill impact.",
      icon: <Trash2 className="inline mr-2 text-red-600" />,
    },
  };

  // Radar Chart
  const radarData = {
    labels: ["Travel", "Electricity", "Meals", "Shopping", "Waste"],
    datasets: [
      {
        label: "Emissions (kg CO₂e)",
        data: [
          emissions.travel,
          emissions.electricity,
          emissions.meals,
          emissions.shopping,
          emissions.waste,
        ],
        backgroundColor: "rgba(34, 197, 94, 0.3)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        pointBackgroundColor: "#22c55e",
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percentage = ((value / totalEmission) * 100).toFixed(1);
            return `${value.toFixed(2)} kg CO₂e (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: { color: "#e5e7eb" },
        grid: { color: "#d1d5db" },
        pointLabels: { font: { size: 14 } },
        ticks: { backdropColor: "transparent", color: "#374151" },
      },
    },
  };

  // Doughnut Chart
  const doughnutData = {
    labels: ["Travel", "Electricity", "Meals", "Shopping", "Waste"],
    datasets: [
      {
        data: [
          emissions.travel,
          emissions.electricity,
          emissions.meals,
          emissions.shopping,
          emissions.waste,
        ],
        backgroundColor: [
          "#4ade80",
          "#60a5fa",
          "#facc15",
          "#c084fc",
          "#f87171",
        ],
        borderColor: "#fff",
        borderWidth: 3,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "70%",
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percentage = ((value / totalEmission) * 100).toFixed(1);
            return `${value.toFixed(2)} kg CO₂e (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <motion.div
      className="p-6 space-y-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-green-700">
        🌍 Daily Summary ({today})
      </h2>

      {/* Total emissions */}
      <motion.div
        className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 p-6 rounded-2xl shadow-lg text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="text-xl font-semibold">Total Emissions</h3>
        <p className="text-3xl font-bold text-red-600 mt-2">
          {totalEmission.toFixed(2)} kg CO₂e
        </p>
      </motion.div>

      {/* Category summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "travel", title: "🚗 Travel", value: `${summary.travel?.km || 0} km → ${emissions.travel.toFixed(2)} kg CO₂e`, color: "green" },
          { key: "electricity", title: "⚡ Electricity", value: `${summary.electricity?.units || 0} units → ${emissions.electricity.toFixed(2)} kg CO₂e`, color: "blue" },
          { key: "meals", title: "🍽️ Meals", value: `Veg: ${summary.meals?.veg || 0}, Non-Veg: ${summary.meals?.nonVeg || 0} → ${emissions.meals.toFixed(2)} kg CO₂e`, color: "yellow" },
          { key: "shopping", title: "🛍️ Shopping", value: `₹${summary.shopping?.amount || 0} → ${emissions.shopping.toFixed(2)} kg CO₂e`, color: "purple" },
          { key: "waste", title: "🗑️ Waste", value: `${summary.waste?.quantity || 0} kg → ${emissions.waste.toFixed(2)} kg CO₂e`, color: "red" },
        ].map((item, i) => (
          <motion.div
            key={item.key}
            className={`p-4 rounded-xl shadow border-l-4 border-${item.color}-400 ${topCategory === item.key ? "ring-2 ring-yellow-400 bg-yellow-50" : `bg-${item.color}-50`}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, scale: topCategory === item.key ? 1.05 : 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold flex items-center justify-between">
              {item.title}
              {topCategory === item.key && (
                <span className="ml-2 flex items-center text-yellow-600 font-bold text-sm">
                  <Award className="w-4 h-4 mr-1" /> Top Contributor
                </span>
              )}
            </h3>
            <p>{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center">📡 Emissions Radar Chart</h3>
          <Radar data={radarData} options={radarOptions} />
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center">🍩 Emissions Doughnut Chart</h3>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </motion.div>
      </div>

      {/* Suggestions */}
      <motion.div
        className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 p-6 rounded-2xl shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" /> Suggestions for Improvement
        </h3>
        <ul className="list-none space-y-2 text-gray-700">
          {top3.map((cat, i) => (
            <li key={i} className="flex items-start">{suggestions[cat].icon}<span>{suggestions[cat].text}</span></li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default DailySummary;
