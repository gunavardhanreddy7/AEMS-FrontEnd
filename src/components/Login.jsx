// src/components/Login.jsx
import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed: invalid credentials or server not reachable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="le-login-root">
      <div className="le-card" role="main" aria-labelledby="login-title">
        <header className="le-header">
          <div className="le-badge" aria-hidden>
            AE
          </div>
          <div>
            <h1 id="login-title" className="le-heading">Advanced Employee Portal</h1>
            <p className="le-sub">Sign in to continue</p>
          </div>
        </header>

        {error && <div className="le-error" role="alert">{error}</div>}

        <form className="le-form" onSubmit={submit} autoComplete="on">
          <label className="le-field">
            <span className="le-label">Email</span>
            <input
              className="le-input"
              type="email"
              name="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              aria-required="true"
            />
          </label>

          <label className="le-field">
            <span className="le-label">Password</span>
            <div className="le-password-wrap">
              <input
                className="le-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                aria-required="true"
              />
              <button
                type="button"
                className="le-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button className="le-submit" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <footer className="le-footer">
          <a className="le-link" href="/forgot">Forgot password?</a>
        </footer>
      </div>
    </div>
  );
}
