import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EmployeeProfile from "./components/EmployeeProfile";
import Attendance from "./components/Attendance";
import LeaveRequest from "./components/LeaveRequest";
import ManagerLeaves from "./components/ManagerLeaves";
import Payroll from "./components/Payroll";
import Performance from "./components/Performance";
import Layout from "./components/Layout";

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return <Navigate to="/" replace />;
  return children;
}

// Manager Route wrapper
function ManagerRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user || user.role !== "MANAGER")
    return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected routes wrapped in Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<EmployeeProfile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<LeaveRequest />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/payroll" element={<Payroll />} />

          {/* Manager-only route */}
          <Route
            path="/manager/leaves"
            element={
              <ManagerRoute>
                <ManagerLeaves />
              </ManagerRoute>
            }
          />
        </Route>

        {/* Catch-all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
