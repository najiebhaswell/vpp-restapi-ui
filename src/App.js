import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Bonds from "./pages/Bonds"; // <-- Pastikan ini dipakai

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ margin: 16 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bonds" element={<Bonds />} />
          {/* Tambahkan route lain sesuai kebutuhan */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
