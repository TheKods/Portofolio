import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <App />
    <Analytics />
  </HelmetProvider>
);
