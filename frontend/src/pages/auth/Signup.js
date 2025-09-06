// src/pages/auth/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Leaf, Mail, Lock } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check password match
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    // Check minimum length
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long!");
    }

    try {
      await signup(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message || "Failed to create account. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated-gradient relative overflow-hidden px-4">
      {/* Floating leaves */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: 0 }}
            animate={{ y: [0, -25, 0] }}
            transition={{
              repeat: Infinity,
              duration: 8 + i,
              ease: "easeInOut",
            }}
          >
            <Leaf size={28} />
          </motion.div>
        ))}
      </motion.div>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/20 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-lg text-gray-900"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-500/90 text-white p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex items-center bg-white/80 rounded-lg border border-gray-300 px-3">
            <Mail className="text-green-600 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-transparent focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/80 rounded-lg border border-gray-300 px-3">
            <Lock className="text-green-600 mr-2" size={20} />
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-transparent focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center bg-white/80 rounded-lg border border-gray-300 px-3">
            <Lock className="text-green-600 mr-2" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 bg-transparent focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold shadow-md transform transition hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
