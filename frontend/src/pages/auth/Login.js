import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, Leaf } from "lucide-react";

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
      setError("Incorrect email or password. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-green-50 via-white to-green-100 px-6 overflow-hidden">

      {/* Floating Background Designs */}
      <motion.div
        className="absolute w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-30 top-10 left-[-100px]"
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-green-100 rounded-full blur-2xl opacity-20 bottom-[-50px] right-[-40px]"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-white/70 backdrop-blur-xl px-8 py-10 rounded-3xl w-full max-w-md shadow-xl border border-white/50"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <Leaf className="text-green-700" size={28} />
          <h2 className="text-3xl font-bold text-green-800 tracking-tight">
            Welcome Back
          </h2>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 text-red-700 py-2 rounded-md text-center mb-5 text-sm font-medium"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex items-center bg-white rounded-xl border border-green-400 px-4 shadow-sm focus-within:ring-2 focus-within:ring-green-300">
            <Mail className="text-green-600 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full py-3 bg-transparent text-gray-800 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white rounded-xl border border-green-400 px-4 shadow-sm focus-within:ring-2 focus-within:ring-green-300">
            <Lock className="text-green-600 mr-2" size={20} />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full py-3 bg-transparent text-gray-800 outline-none"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold shadow-lg tracking-wide"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <Link className="text-green-700 hover:underline font-semibold" to="/signup">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
