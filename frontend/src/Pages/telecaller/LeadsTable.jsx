import { useEffect, useState } from "react";
import api from "../utils/api";
import Select from "react-select";

export default function MyLeads() {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  // useEffect(() => {
  //   api.get("/telecaller/my-leads").then((res) => setLeads(res.data));
  // }, []);
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.get("/telecaller/my-leads");
        setLeads(res.data);
      } catch (error) {
        console.log("Fetch Leads Error:", error);
      }
    };

    fetchLeads();
  }, []);

  const updateLead = async (id, status, remarks, followUpDate) => {
    try {
      const res = await api.put(`/telecaller/lead/${id}`, {
        status,
        remarks,
        followUpDate,
      });

      alert(res.data.msg);
    } catch (error) {
      console.log("Error:", error.response?.data);
      alert("Update Failed");
    }
  };
  const remarkOptions = [
    { value: "Not Interested", label: "Not Interested" },
    { value: "Call Tomorrow", label: "Call Tomorrow" },
    { value: "Call Later", label: "Call Later" },
    { value: "Student Busy", label: "Student Busy" },
    { value: "Wrong Number", label: "Wrong Number" },
    { value: "Interested", label: "Interested" },
  ];

  const handleChange = (id, field, value) => {
    setLeads((prev) =>
      prev.map((lead) => (lead._id === id ? { ...lead, [field]: value } : lead))
    );
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    try {
      const res = await api.get(`/telecaller/my-leads?status=${statusFilter}`);
      setLeads(res.data);
    } catch (error) {
      console.log("Fetch Leads Error:", error);
    }
  };

  return (
    <div>
      <h2>My Leads</h2>
      <div className="lead-filters">
        <button onClick={() => setStatusFilter("all")}>All</button>

        <button onClick={() => setStatusFilter("pending")}>Pending</button>

        <button onClick={() => setStatusFilter("followup")}>Follow Up</button>

        <button onClick={() => setStatusFilter("callback")}>Callback</button>

        <button onClick={() => setStatusFilter("converted")}>Converted</button>

        <button onClick={() => setStatusFilter("cold")}>Cold</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Follow Up</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.mobile}</td>

                <td>
                  <select id={`status-${lead._id}`} defaultValue={lead.status}>
                    <option value="pending">Pending</option>
                    <option value="followup">Follow Up</option>
                    <option value="callback">Callback</option>
                    <option value="converted">Converted</option>
                    <option value="cold">Cold</option>
                  </select>
                </td>

                {/* <input id={`remarks-${lead._id}`} defaultValue={lead.remarks} /> */}
                <td style={{ width: "220px" }}>
                  <Select
                    options={remarkOptions}
                    value={remarkOptions.find(
                      (opt) => opt.value === lead.remarks
                    )}
                    onChange={(selected) =>
                      handleChange(lead._id, "remarks", selected.value)
                    }
                    isSearchable
                    placeholder="Select remark"
                  />
                </td>

                <td>
                  <input type="date" id={`date-${lead._id}`} />
                </td>

                <td>
                  <button
                    onClick={() =>
                      updateLead(
                        lead._id,
                        document.getElementById(`status-${lead._id}`).value,
                        // document.getElementById(`remarks-${lead._id}`).value,
                        lead.remarks,
                        document.getElementById(`date-${lead._id}`).value
                      )
                    }
                    style={{
                      background: " hsl(25, 100%, 90%)",

                      fontWeight: "600",
                      color: "#ff6b00",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
