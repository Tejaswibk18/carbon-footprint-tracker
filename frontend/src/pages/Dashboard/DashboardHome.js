// src/pages/Dashboard/DashboardHome.js
import React from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Welcome to Your Dashboard 🌍
      </h1>
      <p className="mb-8 text-gray-600">
        Track, analyze, and reduce your carbon footprint with insights and
        reports.
      </p>

      {/* Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Input */}
        <Link
          to="/dashboard/daily-input"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            ➕ Add Daily Input
          </h2>
          <p className="text-gray-500">
            Log today’s travel, meals, electricity, and more.
          </p>
        </Link>

        {/* Daily Summary */}
        <Link
          to="/dashboard/daily-summary"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            📊 Daily Summary
          </h2>
          <p className="text-gray-500">
            Get a quick overview of your activities today.
          </p>
        </Link>

        {/* Monthly Summary */}
        <Link
          to="/dashboard/monthly-summary"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            📅 Monthly Summary
          </h2>
          <p className="text-gray-500">
            View your emissions trend for the month.
          </p>
        </Link>

        {/* History */}
        <Link
          to="/dashboard/history"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            📖 History
          </h2>
          <p className="text-gray-500">
            Explore all your past activity logs in detail.
          </p>
        </Link>

        {/* My Emissions */}
        <Link
          to="/dashboard/my-emissions"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🌱 My Emissions
          </h2>
          <p className="text-gray-500">
            See a category-wise breakdown of your carbon footprint.
          </p>
        </Link>

        {/* Progress */}
        <Link
          to="/dashboard/progress"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🚀 Your Progress
          </h2>
          <p className="text-gray-500">
            Track your improvements and emission reduction goals.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
