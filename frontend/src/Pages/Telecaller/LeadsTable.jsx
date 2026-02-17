import { useEffect, useState } from "react";
import api from "../utils/api";

export default function MyLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.get("/telecaller/my-leads").then((res) => setLeads(res.data));
  }, []);

  const updateLead = async (id, status, remarks, followUpDate) => {
    await api.put(`/telecaller/update-lead/${id}`, {
      status,
      remarks,
      followUpDate,
    });

    alert("Lead Updated");
  };

  return (
    <div>
      <h2>My Leads</h2>

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
                  <option value="followup">Follow Up</option>
                  <option value="callback">Callback</option>
                  <option value="converted">Converted</option>
                  <option value="cold">Cold</option>
                </select>
              </td>

              <td>
                <input id={`remarks-${lead._id}`} defaultValue={lead.remarks} />
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
                      document.getElementById(`remarks-${lead._id}`).value,
                      document.getElementById(`date-${lead._id}`).value
                    )
                  }
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import api from "../utils/api";

// const LeadsTable = () => {
//   const [leads, setLeads] = useState([]);
//   const [remarks, setRemarks] = useState("");

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const fetchLeads = async () => {
//     try {
//       const res = await api.get("/telecaller/leads");
//       setLeads(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await api.put(`/telecaller/lead/${id}`, {
//         status,
//         remarks,
//       });

//       alert("Lead Updated");
//       setRemarks("");
//       fetchLeads();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="leads-section">
//       <h3>My Assigned Leads</h3>

//       <table className="leads-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Mobile</th>
//             <th>Course</th>
//             <th>Status</th>
//             <th>Action</th>
//             <th>Remarks</th>
//           </tr>
//         </thead>

//         <tbody>
//           {leads.map((lead) => (
//             <tr key={lead._id}>
//               <td>{lead.name}</td>
//               <td>{lead.mobile}</td>
//               <td>{lead.course}</td>
//               <td>{lead.status}</td>

//               <td>
//                 <button onClick={() => updateStatus(lead._id, "followup")}>
//                   Follow-Up
//                 </button>

//                 <button onClick={() => updateStatus(lead._id, "callback")}>
//                   Callback
//                 </button>

//                 <button onClick={() => updateStatus(lead._id, "converted")}>
//                   Converted
//                 </button>

//                 <button onClick={() => updateStatus(lead._id, "cold")}>
//                   Cold
//                 </button>
//               </td>

//               <td>
//                 <input
//                   type="text"
//                   placeholder="Add remarks"
//                   value={remarks}
//                   onChange={(e) => setRemarks(e.target.value)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LeadsTable;
