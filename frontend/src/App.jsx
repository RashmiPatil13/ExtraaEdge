import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./Pages/Homepage/LandingPage";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/Registration";
import Contact from "./Pages/Homepage/Contact";

// Dashboards
import AdminDashboard from "./Pages/AdminDashboard";
import ManagerDashboard from "./Pages/ManagerDashboard";
import TelecallerDashboard from "./Pages/TelecallerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/telecaller" element={<TelecallerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
