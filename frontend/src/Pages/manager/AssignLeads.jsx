import { useEffect, useState } from "react";
import axios from "axios";
import "../manager/manager.css";
import api from "../utils/api";

export default function AssignLeads() {
  const [leads, setLeads] = useState([]);
  const [telecallers, setTelecallers] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [telecallerId, setTelecallerId] = useState("");

  useEffect(() => {
    api
      .get("/manager/unassigned-leads")
      .then((res) => setLeads(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get("/manager/telecallers")
      .then((res) => setTelecallers(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* Checkbox handler */
  const toggleLead = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  /* Assign leads */
  const assignLeads = async () => {
    if (!telecallerId || selectedLeads.length === 0) {
      alert("Select leads and telecaller");
      return;
    }

    await api.post(
      "/manager/assign",
      {
        leadIds: selectedLeads,
        telecallerId,
      },

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Leads assigned successfully");

    // Remove assigned leads from UI
    setLeads(leads.filter((l) => !selectedLeads.includes(l._id)));
    setSelectedLeads([]);
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allLeadIds = leads.map((lead) => lead._id);
      setSelectedLeads(allLeadIds);
    } else {
      setSelectedLeads([]);
    }
  };
  return (
    <div>
      <h2 style={{ margin: "20px" }}>Assign Leads</h2>
      {/* Telecaller Dropdown */}
      <select
        className="dropdown"
        value={telecallerId}
        onChange={(e) => setTelecallerId(e.target.value)}
      >
        <option value="">Select Telecaller</option>
        {telecallers.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>
      {/* Leads Table */}
      <table>
        <thead>
          <tr>
            <th>
              <label style={{ gap: "2px" }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedLeads.length === leads.length && leads.length > 0
                  }
                />
                Select All
              </label>
            </th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Course</th>
            <th>Source</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(lead._id)}
                  onChange={() => toggleLead(lead._id)}
                />
              </td>
              <td>{lead.name}</td>
              <td>{lead.mobile}</td>
              <td>{lead.course}</td>
              <td>{lead.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="assign-btn" onClick={assignLeads}>
        Assign Selected Leads
      </button>
    </div>
  );
}
