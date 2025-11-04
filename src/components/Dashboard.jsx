// src/components/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./layout.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const nav = useNavigate();

  const cards = [
    { title: "My Profile", desc: "Update bank & insurance", to: "/profile", emoji: "👤" },
    { title: "Attendance", desc: "Mark in/out", to: "/attendance", emoji: "🕘" },
    { title: "Leave", desc: "Request leave", to: "/leave", emoji: "📝" },
    { title: "Performance", desc: "Add work & view scores", to: "/performance", emoji: "⭐" },
    { title: "Payroll", desc: "View payslips", to: "/payroll", emoji: "💰" },
  ];

  return (
    <div className="container">
      <h1>Welcome{user ? `, ${user.firstName}` : ""}!</h1>
      <p style={{ color: "#666" }}>Quick actions and overview</p>

      <div className="card-grid">
        {cards.map(c => (
          <div key={c.to} className="card" onClick={() => nav(c.to)}>
            <div className="card-emoji">{c.emoji}</div>
            <div>
              <div className="card-title">{c.title}</div>
              <div className="card-desc">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
