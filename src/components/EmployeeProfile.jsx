// src/components/EmployeeProfile.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function EmployeeProfile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [profile, setProfile] = useState(user || {});

  useEffect(() => {
    if (!user) return;
    API.get(`/employees/${user.id}`).then((r) => setProfile(r.data)).catch((e) => console.error(e));
  }, []);

  const save = async () => {
    try {
      await API.put(`/employees/${user.id}`, profile);
      alert("Profile saved");
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  if (!user) return <div className="container">Please login first.</div>;

  return (
    <div className="container">
      <h3>Profile</h3>
      <div>
        <input placeholder="First name" value={profile.firstName || ""} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
      </div>
      <div>
        <input placeholder="Last name" value={profile.lastName || ""} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
      </div>
      <div>
        <input placeholder="Bank account" value={profile.bankAccount || ""} onChange={(e) => setProfile({ ...profile, bankAccount: e.target.value })} />
      </div>
      <div>
        <input placeholder="IFSC" value={profile.bankIfsc || ""} onChange={(e) => setProfile({ ...profile, bankIfsc: e.target.value })} />
      </div>
      <div>
        <input placeholder="Insurance provider" value={profile.insuranceProvider || ""} onChange={(e) => setProfile({ ...profile, insuranceProvider: e.target.value })} />
      </div>
      <div>
        <input placeholder="Insurance number" value={profile.insuranceNumber || ""} onChange={(e) => setProfile({ ...profile, insuranceNumber: e.target.value })} />
      </div>
      <div>
        <input placeholder="Base salary" value={profile.baseSalary || ""} onChange={(e) => setProfile({ ...profile, baseSalary: e.target.value })} />
      </div>
      <button onClick={save}>Save</button>
    </div>
  );
}
