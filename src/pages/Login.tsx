import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://backend.jotish.in/backend_dev/gettabledata.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      // Check if valid table data exists
      if (data?.TABLE_DATA?.data?.length > 0) {
        // Save data
        localStorage.setItem(
          "tableData",
          JSON.stringify(data.TABLE_DATA.data)
        );

        // Navigate to list page
        navigate("/list");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* 🔶 Header */}
      <header className="bg-yellow-400 h-16 flex items-center justify-between px-6 shadow-md">
        <div className="text-xl cursor-pointer">☰</div>
        <h1 className="font-semibold text-lg tracking-wide">JOTISH</h1>
        <div className="text-xl">💳</div>
      </header>

      {/* 🔶 Login Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
          
          <h2 className="text-2xl font-semibold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-black font-semibold py-2 rounded-lg shadow-md disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6 cursor-pointer hover:underline">
            Forgot password?
          </p>

        </div>
      </div>

      {/* 🔶 Footer */}
      <footer className="text-center text-gray-400 text-sm py-4">
        © 2023 JOTISH. All rights reserved.
      </footer>

    </div>
  );
};

export default Login;