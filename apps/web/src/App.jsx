import React from "react";
import { Routes, Route } from "react-router-dom";
import WebcamAscii from "./components/MainTerminal";
import PublicViewer from "./components/PublicViewer"; // We will create this next

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WebcamAscii />} />
      <Route path="/view/:id" element={<PublicViewer />} />
    </Routes>
  );
}