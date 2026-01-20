import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Registration";
import AdminDashboard from "./Pages/AdminDashboard";
import ManagerDashboard from "./Pages/ManagerDashboard";
import TelecallerDashboard from "./Pages/TelecallerDashboard";

import ContactUs from "./components/ContactUs";  // Import ContactUs component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/telecaller" element={<TelecallerDashboard />} />

        <Route path="/contact" element={<ContactUs />} />  {/* Added ContactUs route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
