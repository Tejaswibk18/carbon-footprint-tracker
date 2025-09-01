// src/pages/Dashboard/Emissions.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Emission factors (kg CO2e)
 * - travel: per km
 * - electricity: per unit (kWh)
 * - vegMeal, nonVegMeal: per meal
 * - shopping: per ₹
 * - waste: per kg
 */
const FACTORS = {
  travel: 0.21,
  electricity: 0.85,
  vegMeal: 0.5,
  nonVegMeal: 2.0,
  shopping: 0.03,
  waste: 0.9,
};

const CATEGORY_COLORS = {
  Travel: "#0ea5e9", // sky-500
  Electricity: "#10b981", // emerald-500
  Meals: "#f59e0b", // amber-500
  Shopping: "#f97316", // orange-500
  Waste: "#ef4444", // red-500
};

export default function Emissions() {
  const { currentUser } = useAuth();
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [rawEntries, setRawEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch month data
  useEffect(() => {
    if (!currentUser?.uid) {
      setRawEntries([]);
      setLoading(false);
      return;
    }

    const abort = new AbortController();
    const fetchMonth = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/daily-input/${currentUser.uid}/month/${month}`,
          { signal: abort.signal }
        );
        const body = await res.json();
        // Accept either array directly or { data: [...] } or { success: true, data: [...] }
        const entries = Array.isArray(body)
          ? body
          : Array.isArray(body?.data)
          ? body.data
          : Array.isArray(body?.history)
          ? body.history
          : [];
        // ensure entries are sorted by date
        entries.sort((a, b) => (a.date > b.date ? 1 : -1));
        setRawEntries(entries);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching emissions data:", err);
          setRawEntries([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMonth();
    return () => abort.abort();
  }, [currentUser, month]);

  // convert raw inputs -> emissions per entry and totals
  const { totalsEmissions, perCategoryChartData, dailyTrend } = useMemo(() => {
    const totals = {
      Travel: 0,
      Electricity: 0,
      Meals: 0,
      Shopping: 0,
      Waste: 0,
    };
    const trend = []; // per-day emissions breakdown + total

    rawEntries.forEach((entry) => {
      const travelKm = entry.travel?.km ?? entry.travel?.distance ?? 0;
      const elecUnits = entry.electricity?.units ?? 0;
      const veg = entry.meals?.veg ?? 0;
      const nonveg = entry.meals?.nonVeg ?? 0;
      const shoppingAmt = entry.shopping?.amount ?? entry.shopping ?? 0;
      const wasteKg = entry.waste?.quantity ?? entry.waste ?? 0;

      const travelEm = travelKm * FACTORS.travel;
      const elecEm = elecUnits * FACTORS.electricity;
      const mealsEm = veg * FACTORS.vegMeal + nonveg * FACTORS.nonVegMeal;
      const shoppingEm = shoppingAmt * FACTORS.shopping;
      const wasteEm = wasteKg * FACTORS.waste;

      totals.Travel += travelEm;
      totals.Electricity += elecEm;
      totals.Meals += mealsEm;
      totals.Shopping += shoppingEm;
      totals.Waste += wasteEm;

      trend.push({
        date: entry.date,
        Travel: Number(travelEm.toFixed(3)),
        Electricity: Number(elecEm.toFixed(3)),
        Meals: Number(mealsEm.toFixed(3)),
        Shopping: Number(shoppingEm.toFixed(3)),
        Waste: Number(wasteEm.toFixed(3)),
        total: Number((travelEm + elecEm + mealsEm + shoppingEm + wasteEm).toFixed(3)),
      });
    });

    // chart-ready category totals
    const catData = Object.keys(totals).map((k) => ({
      name: k,
      value: Number(totals[k].toFixed(3)),
    }));

    return {
      totalsEmissions: totals,
      perCategoryChartData: catData,
      dailyTrend: trend,
    };
  }, [rawEntries]);

  // quick computed KPI values
  const totalEmission = useMemo(() => {
    return Object.values(totalsEmissions).reduce((a, b) => a + b, 0);
  }, [totalsEmissions]);

  const highestCategory = useMemo(() => {
    const arr = Object.entries(totalsEmissions);
    if (!arr.length) return null;
    arr.sort((a, b) => b[1] - a[1]);
    return { name: arr[0][0], value: arr[0][1] };
  }, [totalsEmissions]);

/*  const lowestCategory = useMemo(() => {
    const arr = Object.entries(totalsEmissions);
    if (!arr.length) return null;
    arr.sort((a, b) => a[1] - b[1]);
    return { name: arr[0][0], value: arr[0][1] };
  }, [totalsEmissions]); */

  const avgPerDay = useMemo(() => {
    const days = Math.max(1, new Date(`${month}-01`).getMonth() === new Date(month + "-01").getMonth() ? rawEntries.length : rawEntries.length);
    // if no daily entries simply approximate by days in month
    const daysInMonth = new Date(month.split("-")[0], Number(month.split("-")[1]), 0).getDate();
    const divisor = rawEntries.length ? rawEntries.length : daysInMonth;
    return days === 0 ? 0 : totalEmission / divisor;
  }, [totalEmission, rawEntries, month]);

  // suggestions mapping by category
  const SUGGESTIONS = {
    Travel: "Try public transport, carpooling, or cycling for short trips — every km avoided saves ~0.21 kg CO₂e.",
    Electricity: "Switch to energy-efficient bulbs and unplug idle devices. Each kWh saved ≈ 0.85 kg CO₂e.",
    Meals: "Swap one non-veg meal for a veg one — saves ~2.0 kg CO₂e per meal.",
    Shopping: "Buy less and choose sustainable brands; small reductions add up (0.03 kg CO₂e per ₹).",
    Waste: "Compost organic waste and recycle — each kg diverted can save ~1.2 kg CO₂e.",
  };

  // top-3 contributors for suggestion list
  const top3 = useMemo(() => {
    const arr = Object.entries(totalsEmissions).map(([k, v]) => ({ k, v }));
    arr.sort((a, b) => b.v - a.v);
    return arr.slice(0, 3).map((x) => x.k);
  }, [totalsEmissions]);

  // small helper to format numbers
  const fmt = (n) => Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });

return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">📊 Emissions Dashboard</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing emissions (kg CO₂e) for <strong>{month}</strong>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-700">Month</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-6 bg-white rounded-lg shadow">Loading...</div>
      ) : (
        <>
          {/* KPI: total emissions */}
          <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 p-5 rounded-2xl shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Emissions</p>
              <h3 className="text-3xl font-bold text-rose-600">
                {fmt(totalEmission)} kg CO₂e
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Avg/day: <strong>{fmt(avgPerDay)}</strong> kg CO₂e
              </p>
            </div>
            {highestCategory && (
              <div className="inline-flex items-center gap-3 bg-white/60 p-3 rounded-xl shadow-md border">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg"
                  style={{
                    background: CATEGORY_COLORS[highestCategory.name],
                    boxShadow: `0 0 12px ${CATEGORY_COLORS[highestCategory.name]}66`,
                  }}
                >
                  {highestCategory.name === "Travel"
                    ? "🚗"
                    : highestCategory.name === "Electricity"
                    ? "⚡"
                    : highestCategory.name === "Meals"
                    ? "🍽️"
                    : highestCategory.name === "Shopping"
                    ? "🛍️"
                    : "🗑️"}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Top Contributor</p>
                  <p className="font-semibold">{highestCategory.name}</p>
                  <p className="text-sm text-gray-600">
                    {fmt(highestCategory.value)} kg CO₂e
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {perCategoryChartData.map((item) => {
              const color = CATEGORY_COLORS[item.name] || "#999";
              const icon =
                item.name === "Travel"
                  ? "🚗"
                  : item.name === "Electricity"
                  ? "⚡"
                  : item.name === "Meals"
                  ? "🍽️"
                  : item.name === "Shopping"
                  ? "🛍️"
                  : "🗑️";
              return (
                <div
                  key={item.name}
                  className="flex flex-col items-center p-4 rounded-2xl shadow-sm bg-white"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full text-xl mb-2"
                    style={{ background: `${color}22`, color }}
                  >
                    <span>{icon}</span>
                  </div>
                  <div className="text-sm text-gray-600">{item.name}</div>
                  <div className="text-base font-semibold mt-1">
                    {fmt(item.value)} kg
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar */}
            <div className="bg-white p-4 rounded-2xl shadow">
              <h4 className="font-semibold mb-2">Category Breakdown</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={perCategoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(val) => `${fmt(val)} kg`} />
                  <Legend />
                  <Bar dataKey="value">
                    {perCategoryChartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={CATEGORY_COLORS[entry.name]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie */}
            <div className="bg-white p-4 rounded-2xl shadow">
              <h4 className="font-semibold mb-2">Share by Category</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={perCategoryChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={40}
                    label={(entry) =>
                      `${entry.name}: ${(
                        (entry.value / (totalEmission || 1)) *
                        100
                      ).toFixed(0)}%`
                    }
                  >
                    {perCategoryChartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={CATEGORY_COLORS[entry.name]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${fmt(val)} kg`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line chart with all categories */}
            <div className="bg-white p-4 rounded-2xl shadow lg:col-span-2">
              <h4 className="font-semibold mb-2">Daily Emissions Trend</h4>
              {dailyTrend.length === 0 ? (
                <p className="text-gray-500">No daily data available.</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(val) => `${fmt(val)} kg`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Travel"
                      stroke={CATEGORY_COLORS.Travel}
                    />
                    <Line
                      type="monotone"
                      dataKey="Electricity"
                      stroke={CATEGORY_COLORS.Electricity}
                    />
                    <Line
                      type="monotone"
                      dataKey="Meals"
                      stroke={CATEGORY_COLORS.Meals}
                    />
                    <Line
                      type="monotone"
                      dataKey="Shopping"
                      stroke={CATEGORY_COLORS.Shopping}
                    />
                    <Line
                      type="monotone"
                      dataKey="Waste"
                      stroke={CATEGORY_COLORS.Waste}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Insights */}
          <div className="mt-4 p-5 bg-gray-50 rounded-2xl shadow">
            <h4 className="font-semibold mb-3">💡 Insights & Suggestions</h4>
            {totalEmission === 0 ? (
              <p className="text-gray-600">
                No emissions recorded for this month.
              </p>
            ) : (
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Total emissions:</strong> {fmt(totalEmission)} kg CO₂e
                  for {month}.
                </li>
                <li>
                  <strong>Top contributor:</strong>{" "}
                  {highestCategory?.name ?? "-"} (
                  {fmt(highestCategory?.value ?? 0)} kg).
                </li>
                <li>
                  <strong>Average per active day:</strong>{" "}
                  {fmt(avgPerDay)} kg CO₂e.
                </li>
                <li>
                  <strong>Top actions:</strong>
                  <ul className="list-disc pl-6 mt-2">
                    {top3.map((cat) => (
                      <li key={cat}>
                        <strong>{cat}:</strong> {SUGGESTIONS[cat]}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
