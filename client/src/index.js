import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SubmitProject from "./pages/SubmitProject";
import MyTokens from "./pages/MyTokens";
import "./index.css";
import Trade from "./pages/Trade"; // 🆕
import TradeTokens from "./pages/TradeTokens";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/submit" element={<SubmitProject />} />
      <Route path="/my-tokens" element={<MyTokens />} />
      <Route path="/trade" element={<Trade />} /> {/* 🆕 */}
      <Route path="/trade" element={<TradeTokens />} />
    </Routes>
  </BrowserRouter>
);
