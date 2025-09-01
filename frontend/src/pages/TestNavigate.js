// src/pages/TestNavigate.js
import React from "react";
import { useNavigate } from "react-router-dom";

const TestNavigate = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">Navigation Test Page</h1>
      <button
        onClick={goToDashboard}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default TestNavigate;
