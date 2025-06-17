import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
// import halaman lain sesuai kebutuhan

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ margin: 16 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/bonds" element={<BondPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
