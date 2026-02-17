import { useState } from "react";
import api from "../utils/api";

export default function ManagerLeadsTable({ leads, setLeads }) {
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.mobile?.includes(search) ||
      lead.email?.toLowerCase().includes(search.toLowerCase())
  );

  const deleteLead = async (id) => {
    await api.delete(`/manager/lead/${id}`);

    setLeads(leads.filter((l) => l._id !== id));
    alert("Lead Deleted Successfully");
  };
  const editLead = (lead) => {
    setEditData(lead);
  };
  const updateLead = async () => {
    await api.put(`/manager/lead/${editData._id}`, editData);

    alert("Lead Updated");

    setLeads(leads.map((l) => (l._id === editData._id ? editData : l)));

    setEditData(null);
  };

  return (
    <div>
      <h3>Leads List</h3>

      <input
        type="text"
        placeholder="Search by name, phone, email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px", width: "300px" }}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            {/* <th>Email</th> */}
            <th>Status</th>
            <th>Remarks</th>

            <th>Assigned</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.mobile}</td>
              {/* <td>{lead.email}</td> */}
              <td>{lead.status}</td>
              <td>{lead.remarks}</td>
              <td>{lead.assignedTo ? lead.assignedTo.name : "Not Assigned"}</td>

              <td>
                <button
                  onClick={() => editLead(lead)}
                  className="btn btn-success"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteLead(lead._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editData && (
        <div>
          <h3>Edit Lead</h3>

          <input
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />

          <input
            value={editData.mobile}
            onChange={(e) =>
              setEditData({ ...editData, mobile: e.target.value })
            }
          />

          <input
            value={editData.email}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
          />

          <select
            value={editData.status}
            onChange={(e) =>
              setEditData({ ...editData, status: e.target.value })
            }
          >
            <option>new</option>
            <option>followup</option>
            <option>converted</option>
          </select>

          <button onClick={updateLead}>Save</button>
          <button onClick={() => setEditData(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
