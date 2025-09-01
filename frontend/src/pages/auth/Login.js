// src/pages/auth/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Background animation - floating eco bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-32 h-32 bg-green-200 rounded-full opacity-50 animate-bounce top-10 left-10"></div>
        <div className="absolute w-20 h-20 bg-green-300 rounded-full opacity-40 animate-ping top-1/2 left-1/4"></div>
        <div className="absolute w-24 h-24 bg-green-400 rounded-full opacity-30 animate-bounce bottom-10 right-10"></div>
      </div>

      {/* Login card with bottom-up animation */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input with icon */}
          <div className="flex items-center border rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-400">
            <Mail className="text-green-600 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>

          {/* Password input with icon */}
          <div className="flex items-center border rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-400">
            <Lock className="text-green-600 mr-2" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
