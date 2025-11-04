// src/components/LeaveRequest.jsx
import React, { useState, useEffect } from "react";
import API from "../api/api";

export default function LeaveRequest() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null); // selected leave for details
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const r = await API.get(`/leaves/employee/${user.id}`);
      setList(r.data);
    } catch (e) {
      console.error(e);
      alert("Could not load leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!user) return alert("Login required");
    if (!start || !end) return alert("Select start and end dates");
    try {
      await API.post(`/leaves/submit?empId=${user.id}`, { startDate: start, endDate: end, reason });
      setStart(""); setEnd(""); setReason("");
      load();
      alert("Leave submitted");
    } catch (e) {
      console.error(e);
      alert("Submit failed");
    }
  };

  const cancel = async (id) => {
    // if backend supports DELETE /api/leaves/{id}
    if (!window.confirm("Cancel this pending leave?")) return;
    try {
      await API.delete(`/leaves/${id}`);
      load();
    } catch (e) {
      console.error(e);
      alert("Cancel failed");
    }
  };

  return (
    <div className="container">
      <h3>Leave Request</h3>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <div>
          <label>Start</label><br />
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>

        <div>
          <label>End</label><br />
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>

        <div style={{ flex: 1 }}>
          <label>Reason</label><br />
          <input style={{ width: "100%" }} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for leave" />
        </div>

        <div>
          <button onClick={submit}>Submit</button>
        </div>
      </div>

      <h4>Your requests</h4>
      {loading ? <div>Loading...</div> : (
        <ul>
          {list.map((l) => (
            <li key={l.id} style={{ padding: 8, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ cursor: "pointer" }} onClick={() => setSelected(l)}>
                <strong>{l.startDate} → {l.endDate}</strong> — {l.status}
                <div style={{ color: "#666", fontSize: 13 }}>{l.reason}</div>
              </div>
              <div>
                {l.status === "PENDING" && (
                  <button onClick={() => cancel(l.id)} style={{ marginLeft: 10 }}>Cancel</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div style={{
          position: "fixed", left: 0, right: 0, top: 0, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.4)"
        }}>
          <div style={{ background: "#fff", padding: 20, borderRadius: 8, width: "90%", maxWidth: 600 }}>
            <h4>Leave details</h4>
            <div><strong>Employee:</strong> {selected.employee?.firstName} {selected.employee?.lastName}</div>
            <div><strong>Dates:</strong> {selected.startDate} → {selected.endDate}</div>
            <div><strong>Reason:</strong> {selected.reason}</div>
            <div><strong>Status:</strong> {selected.status}</div>
            <div><strong>Requested at:</strong> {selected.requestedAt}</div>
            <div style={{ marginTop: 8 }}><strong>Manager comment:</strong> {selected.managerComment || "-"}</div>
            <div style={{ marginTop: 12, textAlign: "right" }}>
              <button onClick={() => setSelected(null)} style={{ marginRight: 8 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
