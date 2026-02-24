import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("API Response:", data);

      // Adjust this condition based on actual API response
      if (response.ok) {
        alert("Login Successful");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-yellow-400 h-16 flex items-center justify-between px-6 shadow-md">
        <div>☰</div>
        <h1 className="font-semibold text-lg">JOTISH</h1>
        <div>💳</div>
      </header>

      {/* Login Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold py-2 rounded-lg shadow-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Forgot password?
          </p>
        </div>
      </div>

      <footer className="text-center text-gray-400 text-sm py-4">
        © 2023 JOTISH. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;