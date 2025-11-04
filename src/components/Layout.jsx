// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import "./layout.css";

export default function Layout() {
  return (
    <div className="app-shell">
      <NavBar />
      <div className="main-area">
        <Sidebar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
