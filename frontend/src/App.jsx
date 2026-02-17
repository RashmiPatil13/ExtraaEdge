import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ---------- PUBLIC PAGES ----------
import LandingPage from "./Pages/Homepage/LandingPage";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/Registration";
import Contact from "./Pages/Homepage/Contact";

// ---------- ADMIN / MANAGER / TELECALLER ----------
import AdminDashboard from "./Pages/AdminDashboard";
// import ManagerDashboard from "./Pages/Homepage/ManagerDashboard";
import TelecallerDashboard from "./Pages/Telecaller/TelecallerDashboard";

// ---------- MANAGER PAGES ----------
// import Sidebar from "./Pages/Telecaller/Sidebar";
// // import Dashboard from "./pages/Homepage/ManagerDashboard";
// import Leads from "./pages/Telecaller/Leads";
// import Reports from "./pages/Telecaller/Reports";

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
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* ---------- ADMIN ---------- */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* ---------- MANAGER ---------- */}
        <Route path="/manager/*" element={<ManagerLayout />} />

        {/* ---------- TELECALLER ---------- */}
        <Route path="/telecaller" element={<TelecallerLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
