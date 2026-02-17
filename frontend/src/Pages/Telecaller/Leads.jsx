import { useState } from "react";
import "./Leads.css";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="leads-page">
      <h2>My Assigned Leads</h2>
      {/* same JSX logic, just CSS classes */}
    </div>
  );
}
