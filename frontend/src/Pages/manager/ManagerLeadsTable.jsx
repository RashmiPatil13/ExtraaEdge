import { useState, useEffect } from "react";
import api from "../utils/api";

export default function ManagerLeadsTable({ leads, setLeads }) {
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.mobile?.includes(search) ||
      lead.email?.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / leadsPerPage)
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
      <h3 style={{ margin: "20px" }}>Leads List</h3>

      <input
        className="search"
        type="text"
        placeholder="Search by name, phone, email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px", width: "300px" }}
      />
      <div className="table-container">
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
            {/* {filteredLeads.map((lead) => ( */}
            {currentLeads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.mobile}</td>
                {/* <td>{lead.email}</td> */}
                <td>{lead.status}</td>
                <td>{lead.remarks}</td>
                <td>
                  {lead.assignedTo ? lead.assignedTo.name : "Not Assigned"}
                </td>

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
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active-page" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {editData && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h3>Edit Lead</h3>

            <div className="form-row">
              <label>Name</label>
              <input
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label>Mobile</label>
              <input
                value={editData.mobile}
                onChange={(e) =>
                  setEditData({ ...editData, mobile: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label>Status</label>
              <select
                value={editData.status}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
              >
                <option>new</option>
                <option>followup</option>
                <option>converted</option>
                <option>cold</option>
                <option>callback</option>
              </select>
            </div>

            <div className="modal-buttons">
              <button className="save-btn" onClick={updateLead}>
                Save
              </button>

              <button className="cancel-btn" onClick={() => setEditData(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
