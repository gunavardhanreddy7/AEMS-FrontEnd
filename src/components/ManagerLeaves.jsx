// src/components/ManagerLeaves.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function ManagerLeaves() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentFor, setCommentFor] = useState({}); // map leaveId -> comment

  const load = async () => {
    try {
      setLoading(true);
      const r = await API.get("/leaves/pending");
      setList(r.data || []);
    } catch (e) {
      console.error(e); alert("Could not load pending leaves");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const decide = async (id, decision) => {
    const comment = commentFor[id] || "";
    try {
      await API.post(`/leaves/decide?leaveId=${id}&decision=${decision}`, null, { params: { comment } });
      alert("Decision saved");
      load();
    } catch (e) {
      console.error(e); alert("Decision failed");
    }
  };

  return (
    <div className="container">
      <h3>Pending Leaves</h3>
      {loading ? <div>Loading...</div> : (
        <ul>
          {list.map((l) => (
            <li key={l.id} style={{ padding: 12, borderBottom: "1px solid #eee" }}>
              <div><strong>{l.employee?.employeeCode} — {l.employee?.firstName} {l.employee?.lastName}</strong></div>
              <div>{l.startDate} → {l.endDate}</div>
              <div style={{ color: "#666" }}>{l.reason}</div>

              <div style={{ marginTop: 8 }}>
                <input
                  placeholder="Manager comment (optional)"
                  value={commentFor[l.id] || ""}
                  onChange={(e) => setCommentFor({ ...commentFor, [l.id]: e.target.value })}
                  style={{ width: "60%", marginRight: 8 }}
                />
                <button onClick={() => decide(l.id, "APPROVED")}>Approve</button>
                <button onClick={() => decide(l.id, "REJECTED")} style={{ marginLeft: 8 }}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
