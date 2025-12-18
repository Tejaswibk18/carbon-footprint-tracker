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
  Globe2,
  Activity,
  Sparkles,
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
    <div className="min-h-screen flex flex-col bg-animated-gradient text-gray-900 relative overflow-visible">
      {/* Floating Leaves Animation */}
      {leaves.map((pos, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-green-500 opacity-40"
          style={{ top: pos.top, left: pos.left }}
          initial={{ y: 0, opacity: 0.4 }}
          animate={{ y: [0, -25, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 7 + i,
            ease: "easeInOut",
          }}
        >
          <Leaf size={32} />
        </motion.div>
      ))}

      {/* Navbar */}
      <header className="w-full px-8 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Leaf className="text-green-600" />
          <span className="text-2xl font-extrabold tracking-tight">
            Carbon Footprint Tracker
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm md:text-base">
          <a href="#how-it-works" className="hover:text-green-700">
            How it Works
          </a>
          <a href="#features" className="hover:text-green-700">
            Features
          </a>
          <a href="#impact" className="hover:text-green-700 hidden md:inline">
            Impact
          </a>
          <div className="space-x-3">
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
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center flex-1 gap-10 text-center lg:text-left px-6 md:px-16 py-16 relative z-10">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 shadow-sm mb-2"
          >
            <Sparkles className="text-yellow-500" size={18} />
            <span className="text-xs md:text-sm text-gray-600">
              Make every day a little greener ✨
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-green-800 leading-tight"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Measure today,
            <br />
            <span className="text-green-600">
              transform tomorrow<span className="text-3xl">.</span>
            </span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-gray-600 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
          >
            Track your transport, food, energy and daily habits in one place.
            Turn raw data into clear insights, and insights into meaningful,
            low-carbon actions for a healthier planet.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:items-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/signup"
              className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              Start Tracking Now
              <Activity size={18} />
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition font-semibold flex items-center justify-center gap-2 bg-white/60"
            >
              I already have an account
            </Link>
          </motion.div>

          {/* Quick stats strip */}
          <motion.div
            className="mt-6 grid grid-cols-3 gap-3 max-w-md text-xs md:text-sm"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="rounded-xl bg-white/70 backdrop-blur-sm p-3 shadow-sm flex flex-col">
              <span className="font-bold text-green-700 text-sm md:text-base">
                2x
              </span>
              <span className="text-gray-500">Awareness boost</span>
            </div>
            <div className="rounded-xl bg-white/70 backdrop-blur-sm p-3 shadow-sm flex flex-col">
              <span className="font-bold text-green-700 text-sm md:text-base">
                30+{" "}
              </span>
              <span className="text-gray-500">Tracked activities</span>
            </div>
            <div className="rounded-xl bg-white/70 backdrop-blur-sm p-3 shadow-sm flex flex-col">
              <span className="font-bold text-green-700 text-sm md:text-base">
                Live
              </span>
              <span className="text-gray-500">Insights & tips</span>
            </div>
          </motion.div>
        </div>

        {/* Animated Hero Card */}
        <motion.div
          className="flex-1 max-w-md w-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="relative rounded-3xl bg-white/80 shadow-xl p-6 overflow-hidden"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-60" />
            <div className="absolute -left-8 bottom-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-60" />

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe2 className="text-green-600" />
                <span className="font-semibold text-gray-800">
                  Today&apos;s Snapshot
                </span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                Live
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Daily footprint</span>
                <span className="font-bold text-lg text-green-700">
                  7.4 kg CO₂e
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-2.5 bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400"
                  initial={{ width: "30%" }}
                  animate={{ width: ["30%", "55%", "42%"] }}
                  transition={{ repeat: Infinity, duration: 6 }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-green-50 p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-green-700 font-semibold">
                    <Footprints size={16} />
                    <span>Transport</span>
                  </div>
                  <span className="text-gray-500">Mostly public transit 🌱</span>
                </div>
                <div className="rounded-2xl bg-sky-50 p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-blue-700 font-semibold">
                    <BarChart3 size={16} />
                    <span>Energy</span>
                  </div>
                  <span className="text-gray-500">
                    Stable usage with room to improve ⚡
                  </span>
                </div>
              </div>

              <div className="mt-2 rounded-2xl border border-dashed border-green-200 bg-white/70 px-3 py-2 text-xs text-gray-600">
                🌿 <span className="font-semibold text-green-700">Hint:</span>{" "}
                start with one small habit — like taking the stairs or carrying
                a reusable bottle — and watch your footprint slowly drop.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="px-6 md:px-16 py-16 bg-white/90 backdrop-blur-sm relative z-10"
      >
        <h3 className="text-3xl font-bold text-center mb-4 text-green-700">
          How it works
        </h3>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-sm md:text-base">
          In just a few minutes a day, you can understand, monitor and improve
          your impact on the planet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-2xl shadow-md bg-white flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-1">
              <Target className="text-green-700" size={22} />
            </div>
            <h4 className="font-semibold text-lg">Log your lifestyle</h4>
            <p className="text-gray-600 text-sm">
              Quickly record transport, food, energy and other daily activities
              with intuitive inputs.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-2xl shadow-md bg-white flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
              <BarChart3 className="text-emerald-700" size={22} />
            </div>
            <h4 className="font-semibold text-lg">See your footprint</h4>
            <p className="text-gray-600 text-sm">
              Visualize your emissions as clean graphs and patterns — spot what
              drives your footprint higher.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-2xl shadow-md bg-white flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center mb-1">
              <Leaf className="text-lime-700" size={22} />
            </div>
            <h4 className="font-semibold text-lg">Act with confidence</h4>
            <p className="text-gray-600 text-sm">
              Get AI-powered suggestions and set small, realistic goals that
              move you towards a low-carbon lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-6 md:px-16 py-16 bg-green-50 relative z-10"
      >
        <h3 className="text-3xl font-bold text-center mb-4 text-green-700">
          Features that Make Us Stand Out
        </h3>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-sm md:text-base">
          Designed for clarity, built for action — everything you need to track
          and improve your carbon footprint.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-transform"
          >
            <Footprints className="text-green-600 mb-4" size={36} />
            <h4 className="font-semibold text-lg mb-2">Activity Footprints</h4>
            <p className="text-gray-600 text-sm">
              Log and monitor the carbon footprint of your daily travel, meals,
              power usage and more.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-transform"
          >
            <BarChart3 className="text-green-600 mb-4" size={36} />
            <h4 className="font-semibold text-lg mb-2">Smart Analytics</h4>
            <p className="text-gray-600 text-sm">
              Clear trends, weekly patterns and monthly summaries help you see
              exactly where change is needed.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-transform"
          >
            <Target className="text-green-600 mb-4" size={36} />
            <h4 className="font-semibold text-lg mb-2">Set Goals</h4>
            <p className="text-gray-600 text-sm">
              Define personal sustainability goals and celebrate the small wins
              on your journey.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-transform"
          >
            <Leaf className="text-green-600 mb-4" size={36} />
            <h4 className="font-semibold text-lg mb-2">Eco Tips</h4>
            <p className="text-gray-600 text-sm">
              Receive simple, actionable tips you can apply in your real life
              without feeling overwhelmed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact / Community Section */}
      <section
        id="impact"
        className="px-6 md:px-16 py-16 bg-white relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-green-800">
              Built for individuals, powerful as a community
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Your footprint might seem small, but collectively our changes add
              up. Track your progress, inspire others and be part of a more
              climate-conscious generation.
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-green-50 p-4">
                <Users className="text-green-700 mb-2" />
                <p className="font-semibold text-green-800">Community mindset</p>
                <p className="text-gray-600">
                  Encourage friends and family to join, compare progress and
                  grow together.
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4">
                <Activity className="text-emerald-700 mb-2" />
                <p className="font-semibold text-emerald-800">
                  Habit-first design
                </p>
                <p className="text-gray-600">
                  Focus on realistic shifts instead of perfection — every step
                  counts.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="rounded-3xl bg-gradient-to-br from-green-600 via-emerald-500 to-lime-400 p-[1px] shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-3xl bg-white p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf className="text-green-700" size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Ready to shrink your footprint?
                  </p>
                  <p className="text-xs text-gray-500">
                    Start small. Stay consistent. Grow greener.
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Join others who are already tracking their lifestyle and slowly
                shifting towards low-carbon choices. Your future self (and the
                planet) will thank you.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link
                  to="/signup"
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold text-center"
                >
                  Create free account
                </Link>
                <Link
                  to="/login"
                  className="flex-1 px-4 py-2.5 rounded-2xl border border-green-600 text-green-700 hover:bg-green-600 hover:text-white text-sm font-semibold text-center bg-white"
                >
                  Continue where I left
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 px-6 md:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm">
            © {new Date().getFullYear()} Carbon Footprint Tracker. All rights
            reserved.
          </p>
          <div className="flex gap-6 mt-1 md:mt-0 text-sm">
            <a href="#how-it-works" className="hover:underline">
              How it works
            </a>
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a href="#impact" className="hover:underline">
              Impact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
