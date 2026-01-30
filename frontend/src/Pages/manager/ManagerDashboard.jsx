import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import AssignLeads from "./AssignLeads";
import TelecallerRecords from "./TelecallerRecords";
import UploadExcel from "./UploadExcel";
import Reports from "./Reports";
import "../manager/manager.css";

export default function ManagerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="admin-layout">
      <Sidebar setActivePage={setActivePage} />

      <div className="main-content">
        <div className="topbar">
          <h3>Manager Dashboard</h3>
          <span>Welcome, Manager</span>
        </div>

        {activePage === "dashboard" && <Dashboard />}
        {activePage === "assign" && <AssignLeads />}
        {activePage === "telecallers" && <TelecallerRecords />}
        {activePage === "upload" && <UploadExcel />}
        {activePage === "reports" && <Reports />}
      </div>
    </div>
  );
}
