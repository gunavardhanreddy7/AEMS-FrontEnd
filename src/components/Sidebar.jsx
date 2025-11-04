// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import usePendingCount from "../hooks/usePendingCount";
import "./layout.css";

export default function Sidebar() {
  // ✅ Define links here
  const links = [
    { to: "/dashboard", label: "Dashboard", emoji: "🏠" },
    { to: "/profile", label: "Profile", emoji: "👤" },
    { to: "/attendance", label: "Attendance", emoji: "🕘" },
    { to: "/leave", label: "Leave", emoji: "📝" },
    { to: "/performance", label: "Performance", emoji: "⭐" },
    { to: "/payroll", label: "Payroll", emoji: "💰" },
    { to: "/manager/leaves", label: "Manage Leaves", emoji: "✅" },
  ];

  const pending = usePendingCount(30000); // refresh every 30s
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <aside className="sidebar">
      <nav>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              "side-link" + (isActive ? " active" : "")
            }
          >
            <span className="emoji">{l.emoji}</span>
            <span className="label">{l.label}</span>

            {/* ✅ show badge only for manager on Manage Leaves */}
            {l.to === "/manager/leaves" &&
              user?.role === "MANAGER" &&
              pending > 0 && (
                <span className="badge">{pending}</span>
              )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
