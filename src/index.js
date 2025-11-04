// src/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./index.css"; // optional styling file

const container = document.getElementById("root");
createRoot(container).render(<App />);
