import React from "react";
import { BookOpen, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const references = [
  {
    title: "Travel Emissions",
    formula:
      "Emissions = Distance (km) × Emission Factor (kg CO₂/km)",
    description:
      "Emission factors depend on travel mode and fuel type, such as car (0.24–0.27), bike (0.10–0.12), bus (0.12–0.15), EV (0–0.05), train (≈0.05).",
    source: "IPCC Report 2021, GHG Protocol",
  },
  {
    title: "Food Emissions",
    formula: "Emissions = (Veg Meals × 0.5) + (Non-Veg Meals × 2.0)",
    description:
      "Average carbon footprint per meal based on global food lifecycle analysis.",
    source: "Our World in Data - Food Emissions",
  },
  {
    title: "Electricity Usage",
    formula: "Emissions = kWh × 0.9 kg CO₂/kWh",
    description:
      "0.9 kg CO₂/kWh is an average global grid factor considering fossil-fuel supply.",
    source: "International Energy Agency (IEA)",
  },
  {
    title: "Shopping Emissions",
    formula: "Emissions = Amount Spent (₹) × 0.03 kg CO₂",
    description:
      "Represents embodied emissions across production + transport + packaging.",
    source: "WWF Living Planet Report",
  },
  {
    title: "Waste Emissions",
    formula: "Emissions = Waste (kg) × 1.2 kg CO₂/kg",
    description:
      "Approximation of landfill methane + waste-processing emissions.",
    source: "U.S. EPA Greenhouse Gas Model",
  },
];

const Reference = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-emerald-100 p-10 relative overflow-hidden">
      
      {/* Floating Background Effects */}
      <div className="absolute w-96 h-96 bg-emerald-200 opacity-30 rounded-full blur-[120px] top-[-80px] left-[-50px]"></div>
      <div className="absolute w-72 h-72 bg-green-300 opacity-20 rounded-full blur-[100px] bottom-[-60px] right-[-40px]"></div>
      <div className="absolute w-64 h-64 bg-green-200 opacity-20 rounded-full blur-[100px] bottom-20 left-1/3"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center gap-3">
          <BookOpen className="text-green-700" size={36} />
          <Leaf className="text-green-700" size={36} />
        </div>

        <h1 className="text-4xl font-extrabold text-green-800 tracking-wide mt-3">
          Reference & Scientific Data
        </h1>

        <p className="text-gray-600 text-sm mt-2 max-w-xl mx-auto">
          Scientifically backed formulas used for carbon footprint estimation.
        </p>
      </motion.div>

      <motion.div
        layout
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {references.map((ref, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              borderColor: "#059669",
            }}
            className="bg-white/70 backdrop-blur-xl border border-green-200 shadow-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-2 flex gap-2 items-center">
              <Leaf className="text-green-600" size={20} /> {ref.title}
            </h2>

            <p className="text-xs text-emerald-700 font-semibold mb-2">
              Formula:
            </p>

            <p className="bg-green-50 text-green-900 rounded-md text-sm px-3 py-1 mb-3 font-mono">
              {ref.formula}
            </p>

            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              {ref.description}
            </p>

            <p className="text-xs italic text-gray-500 border-t pt-2">
              Source: {ref.source}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-16"
      >
        <p className="text-green-800 text-lg font-medium tracking-wide">
          “Every data point counts — sustainability begins with awareness 🌍✨”
        </p>
      </motion.div>
    </div>
  );
};

export default Reference;
