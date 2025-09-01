// src/pages/Dashboard/Progress.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";

export default function Progress() {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPrevMonth = () => {
    let d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().slice(0, 7);
  };

  const fetchData = async () => {
    if (!currentUser?.uid) return;
    setLoading(true);
    setError("");

    const currentMonth = new Date().toISOString().slice(0, 7);
    const prevMonth = getPrevMonth();

    try {
      const [res1, res2] = await Promise.all([
        fetch(
          `http://localhost:5000/api/daily-input/${currentUser.uid}/month/${currentMonth}`
        ),
        fetch(
          `http://localhost:5000/api/daily-input/${currentUser.uid}/month/${prevMonth}`
        ),
      ]);

      if (!res1.ok || !res2.ok) {
        throw new Error("Failed to fetch data");
      }

      const [curData, prevData] = await Promise.all([res1.json(), res2.json()]);

      const sumData = (arr) => {
        let totals = { travel: 0, electricity: 0, meals: 0, shopping: 0, waste: 0 };
        arr.forEach((d) => {
          totals.travel += d.travel?.km || 0;
          totals.electricity += d.electricity?.units || 0;
          totals.meals += (d.meals?.veg || 0) + (d.meals?.nonVeg || 0);
          totals.shopping += d.shopping?.amount || 0;
          totals.waste += d.waste?.quantity || 0;
        });
        return totals;
      };

      const currentTotals = sumData(curData);
      const prevTotals = sumData(prevData);

      const categories = ["Travel", "Electricity", "Meals", "Shopping", "Waste"];

      const chartData = categories.map((cat) => {
        const cur = currentTotals[cat.toLowerCase()];
        const prev = prevTotals[cat.toLowerCase()] || 0;
        return {
          category: cat,
          Current: cur,
          Previous: prev,
          improved: cur <= prev,
        };
      });

      // Insights (percent change)
      const changes = categories.map((cat) => {
        const cur = currentTotals[cat.toLowerCase()];
        const prev = prevTotals[cat.toLowerCase()] || 1;
        const diff = cur - prev;
        const percentChange = ((diff / prev) * 100).toFixed(1);
        return { cat, diff, percentChange: parseFloat(percentChange) };
      });

      const best = changes.reduce((a, b) =>
        Math.abs(a.percentChange) < Math.abs(b.percentChange) ? a : b
      );
      const worst = changes.reduce((a, b) =>
        Math.abs(a.percentChange) > Math.abs(b.percentChange) ? a : b
      );

      // 🌱 Green Score
      const weights = { travel: 0.25, electricity: 0.25, meals: 0.2, shopping: 0.15, waste: 0.15 };
      let score = 0;
      changes.forEach((c) => {
        const weight = weights[c.cat.toLowerCase()] || 0.2;
        score += c.diff <= 0 ? 100 * weight : Math.max(0, 100 - c.percentChange) * weight;
      });

      // 🌍 CO2 reduction estimate (example multipliers, can be tuned)
      const co2Factors = { travel: 0.21, electricity: 0.9, meals: 2.5, shopping: 0.5, waste: 1.2 };
      let co2Saved = 0;
      changes.forEach((c) => {
        if (c.diff < 0) {
          co2Saved += Math.abs(c.diff) * (co2Factors[c.cat.toLowerCase()] || 1);
        }
      });

      // 🔥 Streak (how many improved categories this month)
      const streak = chartData.filter((c) => c.improved).length;

      // 🎯 Motivational tips
      let tip = "";
      if (score > 80) tip = "Amazing! You're living sustainably. Keep it up 🌿";
      else if (score > 60) tip = "Great job! Small tweaks can push you even higher 🌱";
      else if (score > 40) tip = "Good start! Focus on reducing waste & energy ⚡";
      else tip = "Don't worry, every small step matters. Try improving one habit 💪";

      setData(chartData);
      setInsights({
        changes,
        best,
        worst,
        greenScore: Math.round(score),
        co2Saved: co2Saved.toFixed(2),
        streak,
        tip,
      });
    } catch (err) {
      console.error("❌ Error fetching progress data:", err);
      setError("Failed to load progress. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const fmt = (n) =>
    Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 1 });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-4">📈 Progress (Month-over-Month)</h2>

      {/* Loading / Error */}
      {loading && (
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 className="animate-spin w-5 h-5" />
          <span>Loading your progress...</span>
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}

      {/* Insights */}
      {!loading && insights.changes && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            className="p-4 bg-green-100 rounded-xl shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3 className="font-semibold">🌱 Green Score</h3>
            <p className="text-2xl font-bold">{insights.greenScore}/100</p>
            <p className="text-sm text-gray-600">{insights.tip}</p>
          </motion.div>
          <motion.div
            className="p-4 bg-blue-100 rounded-xl shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold">✅ Best Improvement</h3>
            <p>
              {insights.best.cat}: {insights.best.percentChange}%{" "}
              {insights.best.diff <= 0 ? (
                <ArrowDown className="inline text-green-600 w-4 h-4" />
              ) : (
                <ArrowUp className="inline text-red-600 w-4 h-4" />
              )}
            </p>
            <p className="text-sm text-gray-600">You did great here!</p>
          </motion.div>
          <motion.div
            className="p-4 bg-red-100 rounded-xl shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold">⚠️ Needs Attention</h3>
            <p>
              {insights.worst.cat}: {insights.worst.percentChange}%{" "}
              {insights.worst.diff <= 0 ? (
                <ArrowDown className="inline text-green-600 w-4 h-4" />
              ) : (
                <ArrowUp className="inline text-red-600 w-4 h-4" />
              )}
            </p>
            <p className="text-sm text-gray-600">Try reducing this next month.</p>
          </motion.div>
        </div>
      )}

      {/* Extra Info */}
      {!loading && insights.co2Saved && (
        <div className="p-4 bg-gray-100 rounded-xl shadow space-y-2">
          <p className="font-semibold">🌍 Estimated CO₂ Reduction:</p>
          <p className="text-lg font-bold">{insights.co2Saved} kg CO₂</p>
          <p className="font-semibold">🔥 Improvement Streak:</p>
          <p className="text-lg font-bold">{insights.streak} / 5 categories improved</p>
        </div>
      )}

      {/* Chart */}
      {!loading && data.length === 0 ? (
        <p>No progress data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(val) => `${fmt(val)}`} />
            <Legend />
            <Bar dataKey="Current">
              {data.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={entry.improved ? "#16a34a" : "#dc2626"}
                />
              ))}
            </Bar>
            <Bar dataKey="Previous" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
