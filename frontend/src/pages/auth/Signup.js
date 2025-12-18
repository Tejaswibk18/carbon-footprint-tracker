import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, UserRoundCheck, Leaf } from "lucide-react";

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

    if (!email.includes("@")) return setError("Enter a valid email");

    if (password !== confirmPassword)
      return setError("Passwords do not match!");

    if (password.length < 6)
      return setError("Password must be minimum 6 characters!");

    try {
      await signup(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Signup failed, please try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-white via-green-50 to-green-100 px-6 overflow-hidden">

      {/* Floating animated shapes */}
      <motion.div
        className="absolute w-[430px] h-[430px] bg-green-300 rounded-full blur-3xl opacity-30 top-[-100px] left-0"
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] bg-green-200 rounded-full blur-3xl opacity-30 bottom-[-120px] right-0"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      {/* Signup card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 bg-white/70 backdrop-blur-xl px-8 py-10 rounded-3xl w-full max-w-md shadow-xl border border-white/50"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <Leaf className="text-green-700" size={28} />
          <h2 className="text-3xl font-bold text-green-800 tracking-tight">
            Create Account
          </h2>
        </div>

        {error && (
          <motion.div
            className="bg-red-100 text-red-700 py-2 px-3 rounded-lg text-center mb-4 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="flex items-center bg-white rounded-xl border border-green-400 px-4 shadow-sm focus-within:ring-2 focus-within:ring-green-300">
            <Mail className="text-green-600 mr-2" size={20} />
            <input
              placeholder="Enter Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 bg-transparent outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white rounded-xl border border-green-400 px-4 shadow-sm focus-within:ring-2 focus-within:ring-green-300">
            <Lock className="text-green-600 mr-2" size={20} />
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 bg-transparent outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center bg-white rounded-xl border border-green-400 px-4 shadow-sm focus-within:ring-2 focus-within:ring-green-300">
            <UserRoundCheck className="text-green-600 mr-2" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-3 bg-transparent outline-none"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold shadow-lg tracking-wide"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-800">
          Already registered?{" "}
          <Link className="text-green-800 hover:underline font-semibold" to="/login">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
