// src/hooks/usePendingCount.js
import { useEffect, useState } from "react";
import API from "../api/api";

export default function usePendingCount(pollInterval = 0) {
  const [count, setCount] = useState(0);

  async function load() {
    try {
      const r = await API.get("/leaves/pending");
      setCount(Array.isArray(r.data) ? r.data.length : 0);
    } catch (e) {
      console.error("pending count failed", e);
    }
  }

  useEffect(() => {
    load();
    if (pollInterval > 0) {
      const id = setInterval(load, pollInterval);
      return () => clearInterval(id);
    }
  }, []);

  return count;
}
