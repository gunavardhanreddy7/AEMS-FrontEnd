// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8081/api",
  timeout: 8000,
  withCredentials: true,
});

export default API;
