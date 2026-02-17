import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ---------- PUBLIC PAGES ----------
import LandingPage from "./Pages/Homepage/LandingPage";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/Registration";
import Contact from "./Pages/Homepage/Contact";

// ---------- ADMIN / TELECALLER ----------
import AdminDashboard from "./Pages/AdminDashboard";
import TelecallerDashboard from "./Pages/Telecaller/TelecallerDashboard";

// ---------- MANAGER ----------
import Sidebar from "./Pages/manager/Sidebar";
import Dashboard from "./Pages/manager/Dashboard";
import Leads from "./Pages/manager/AssignLeads";
import Reports from "./Pages/manager/Report";

import "./App.css";

/* ---------------- MANAGER LAYOUT ---------------- */
function ManagerLayout() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}

/* ---------------- TELECALLER LAYOUT ---------------- */
function TelecallerLayout() {
  return (
    <div className="app">
      <TelecallerDashboard />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* MANAGER */}
        <Route path="/manager/*" element={<ManagerLayout />} />

        {/* TELECALLER */}
        <Route path="/telecaller" element={<TelecallerLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;