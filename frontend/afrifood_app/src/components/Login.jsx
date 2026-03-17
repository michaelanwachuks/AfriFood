import React from 'react'
 import { useState } from "react";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // Simulate API call (replace with real backend)
      console.log("Logging in:", formData);

      // Example:
      // const res = await fetch("/api/login", {...})

      setLoading(false);

    } catch (err) {
      setLoading(false);
      setError("Invalid email or password");
    }
  };

   return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">
          <div className="card shadow-lg p-4">

            <h3 className="text-center mb-4">Login</h3>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label d-flex justify-content-between">
                  <span>Password</span>
                  <a href="/forgot-password" style={{ fontSize: "0.9rem" }}>
                    Forgot Password?
                  </a>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            {/* Register Link */}
            <div className="text-center mt-3">
              <small>
                Don’t have an account? <a href="/register">Register</a>
              </small>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login