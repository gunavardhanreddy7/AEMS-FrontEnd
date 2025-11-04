// src/components/Performance.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Performance() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [score, setScore] = useState(5);
  const [list, setList] = useState([]);

  const load = async () => {
    if (!user) return;
    try {
      const r = await API.get(`/performance/employee/${user.id}`);
      setList(r.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!user) return alert("Login required");
    try {
      await API.post(`/performance/add?empId=${user.id}`, { title, description: desc, score });
      setTitle(""); setDesc(""); setScore(5);
      load();
    } catch (e) {
      console.error(e);
      alert("Add failed");
    }
  };

  return (
    <div className="container">
      <h3>Performance</h3>
      <div>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>
      <div>
        <input type="number" min="1" max="10" value={score} onChange={(e) => setScore(e.target.value)} />
      </div>
      <button onClick={add}>Add</button>

      <h4>Your entries</h4>
      <ul>
        {list.map((p) => (
          <li key={p.id}>
            {p.title} ({p.score}) — {p.createdAt}
            <div>Manager feedback: {p.managerFeedback || "-"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
