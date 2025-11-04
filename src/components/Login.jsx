// src/components/Login.jsx
import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed: invalid credentials or server not reachable");
    }
  }
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <input required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input required placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
