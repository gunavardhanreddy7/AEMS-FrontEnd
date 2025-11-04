// src/components/Attendance.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Attendance() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [list, setList] = useState([]);

  const load = async () => {
    if (!user) return;
    try {
      const r = await API.get(`/attendance/employee/${user.id}`);
      setList(r.data);
    } catch (e) {
      console.error(e);
      alert("Could not load attendance");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markIn = async () => {
    if (!user) return alert("Login required");
    await API.post(`/attendance/mark-in?empId=${user.id}`);
    load();
  };

  const markOut = async () => {
    if (!user) return alert("Login required");
    await API.post(`/attendance/mark-out?empId=${user.id}`);
    load();
  };

  return (
    <div className="container">
      <h3>Attendance</h3>
      <button onClick={markIn}>Mark In</button>
      <button onClick={markOut}>Mark Out</button>
      <ul>
        {list.map((a) => (
          <li key={a.id}>
            {a.attendDate} — {a.status} — in: {a.loginTime ?? "-"} out: {a.logoutTime ?? "-"}
          </li>
        ))}
      </ul>
    </div>
  );
}
