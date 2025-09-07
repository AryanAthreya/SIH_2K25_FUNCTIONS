import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import MockLogin from "./components/Login/MockLogin";
import MockUpload from "./components/Load/MockLoad";
import Dashboard from "./components/Dashboard/Dashboard";
import ComplianceDashboard from "./components/ComplianceDashboard/ComplianceDashboard";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<MockLogin />} />
            <Route path="/upload" element={<MockUpload />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compliance" element={<ComplianceDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}