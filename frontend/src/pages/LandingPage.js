// src/pages/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf,
  BarChart3,
  Users,
  Target,
  Footprints,
} from "lucide-react";

const LandingPage = () => {
  // positions for floating leaves
  const leaves = [
    { top: "10%", left: "15%" },
    { top: "30%", left: "70%" },
    { top: "60%", left: "20%" },
    { top: "80%", left: "50%" },
    { top: "40%", left: "90%" },
    { top: "70%", left: "5%" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-animated-gradient text-gray-900 relative overflow-hidden">
      {/* Floating Leaves Animation */}
      {leaves.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500 opacity-40"
          style={{ top: pos.top, left: pos.left }}
          initial={{ y: 0 }}
          animate={{ y: [0, -30, 0] }}
          transition={{
            repeat: Infinity,
            duration: 6 + i,
            ease: "easeInOut",
          }}
        >
          <Leaf size={32} />
        </motion.div>
      ))}

      {/* Navbar */}
      <header className="w-full px-8 py-4 flex justify-between items-center bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Leaf className="text-green-600" /> Carbon Footprint Tracker
        </h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition shadow-md"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-16 relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6 text-green-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🌍 Track. Improve. Sustain.
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Measure your daily carbon footprint, gain insights into your lifestyle,
          and take meaningful steps towards a greener future. Together, we can
          reduce emissions and make the planet healthier.
        </motion.p>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link
            to="/signup"
            className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg"
          >
            Start Tracking
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-2xl border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition font-semibold"
          >
            Login
          </Link>
        </motion.div>
      </section>

      {/* Why Us Section */}
      <section className="px-6 md:px-16 py-16 bg-white relative z-10">
        <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
          Why Choose Our Platform?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <Target className="mx-auto text-green-600 mb-4" size={40} />
            <h4 className="font-semibold text-lg mb-2">Personalized Tracking</h4>
            <p className="text-gray-600">
              Track your transport, food, energy, and lifestyle activities with
              precision.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <BarChart3 className="mx-auto text-green-600 mb-4" size={40} />
            <h4 className="font-semibold text-lg mb-2">Insights & Analytics</h4>
            <p className="text-gray-600">
              Visualize your progress with interactive charts and monthly
              summaries.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <Users className="mx-auto text-green-600 mb-4" size={40} />
            <h4 className="font-semibold text-lg mb-2">Community Impact</h4>
            <p className="text-gray-600">
              Join a community of changemakers reducing footprints together.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-16 bg-green-50 relative z-10">
        <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
          Features that Make Us Stand Out
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-transform">
            <Footprints className="text-green-600 mb-4" size={36} />
            <h4 className="font-semibold text-lg mb-2">Activity Footprints</h4>
            <p className="text-gray-600">
              Log and monitor the carbon footprint of your daily activities.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-transform">
            <BarChart3 className="text-green-600 mb-4" size={36} />
            <h4 className="font-semibold text-lg mb-2">Smart Analytics</h4>
            <p className="text-gray-600">
              Get clear, actionable insights to improve your lifestyle choices.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-transform">
            <Target className="text-green-600 mb-4" size={36} />
            <h4 className="font-semibold text-lg mb-2">Set Goals</h4>
            <p className="text-gray-600">
              Define sustainability goals and track your progress over time.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-transform">
            <Leaf className="text-green-600 mb-4" size={36} />
            <h4 className="font-semibold text-lg mb-2">Eco Tips</h4>
            <p className="text-gray-600">
              Receive personalized tips and recommendations to reduce your footprint
              and adopt greener habits.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 px-6 md:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Carbon Footprint Tracker. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <a href="#about" className="hover:underline">About</a>
            <a href="#features" className="hover:underline">Features</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
