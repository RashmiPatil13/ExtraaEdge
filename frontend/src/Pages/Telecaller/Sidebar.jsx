import "./Sidebar.css";
import { LayoutDashboard, Users, PhoneCall, LogOut } from "lucide-react";

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">ExtraaEdge</h2>

      <button onClick={() => setActivePage("dashboard")}>
        <LayoutDashboard /> Dashboard
      </button>

      <button onClick={() => setActivePage("leads")}>
        <Users /> My Leads
      </button>

      <button onClick={() => setActivePage("reports")}>
        <PhoneCall /> Reports
      </button>

      <button className="logout">
        <LogOut /> Logout
      </button>
    </aside>
  );
}
