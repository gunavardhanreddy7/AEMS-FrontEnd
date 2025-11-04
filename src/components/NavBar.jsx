// src/components/NavBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./layout.css";

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const nav = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    nav("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="brand" onClick={() => nav("/dashboard")}>AEMS</div>
        <div className="brand-sub">Advanced Employee Management</div>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <div className="user-info">
              <div className="user-name">{user.firstName}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <button className="btn-ghost" onClick={logout}>Logout</button>
          </>
        ) : (
          <button className="btn-ghost" onClick={() => nav("/")}>Login</button>
        )}
      </div>
    </header>
  );
}
