// src/components/Payroll.jsx
import React, { useState } from "react";
import API from "../api/api";

export default function Payroll() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [month, setMonth] = useState("");
  const [pay, setPay] = useState(null);

  const compute = async () => {
    if (!user) return alert("Login required");
    try {
      const r = await API.post(`/payroll/compute?empId=${user.id}&month=${month}`);
      setPay(r.data);
    } catch (e) {
      console.error(e);
      alert("Compute failed");
    }
  };

  return (
    <div className="container">
      <h3>Payroll</h3>
      <div>
        <input placeholder="YYYY-MM (e.g. 2025-10)" value={month} onChange={(e) => setMonth(e.target.value)} />
        <button onClick={compute}>Compute</button>
      </div>
      {pay && (
        <div>
          <p>Gross: {pay.gross}</p>
          <p>Net: {pay.net}</p>
        </div>
      )}
    </div>
  );
}
