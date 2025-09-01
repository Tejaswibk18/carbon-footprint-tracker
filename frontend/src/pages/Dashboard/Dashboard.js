// src/pages/Dashboard/Dashboard.js
import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Calendar,
  ClipboardList,
  BarChart3,
  Clock,
  Leaf,
  TrendingUp,
  BookOpen,
  LogOut,
} from "lucide-react";

import DashboardHome from "./DashboardHome";
import DailyInput from "./DailyInput";
import MonthlySummary from "./MonthlySummary";
import History from "./History";
import MyEmissions from "./MyEmissions";
import Progress from "./Progress";
import DailySummary from "./DailySummary";
import Reference from "../Reference"; // ✅ import Reference page

const Dashboard = () => {
  const { logout } = useAuth();

  const navItems = [
    { to: "", label: "Home", icon: <Home size={18} /> },
    { to: "daily-input", label: "Daily Input", icon: <ClipboardList size={18} /> },
    { to: "daily-summary", label: "Daily Summary", icon: <Calendar size={18} /> },
    { to: "monthly-summary", label: "Monthly Summary", icon: <BarChart3 size={18} /> },
    { to: "history", label: "History", icon: <Clock size={18} /> },
    { to: "my-emissions", label: "My Emissions", icon: <Leaf size={18} /> },
    { to: "progress", label: "Progress", icon: <TrendingUp size={18} /> },
    { to: "reference", label: "Reference", icon: <BookOpen size={18} /> }, // ✅ new nav item
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-700 to-green-800 text-white flex flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-10 flex items-center space-x-2">
          <span>🌍</span> <span>Carbon Tracker</span>
        </h2>

        <nav className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-green-500 text-white shadow-md"
                    : "hover:bg-green-600 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 animate-fadeIn">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="daily-input" element={<DailyInput />} />
          <Route path="daily-summary" element={<DailySummary />} />
          <Route path="monthly-summary" element={<MonthlySummary />} />
          <Route path="history" element={<History />} />
          <Route path="my-emissions" element={<MyEmissions />} />
          <Route path="progress" element={<Progress />} />
          <Route path="reference" element={<Reference />} /> {/* ✅ new route */}
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
