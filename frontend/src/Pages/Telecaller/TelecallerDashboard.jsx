import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import LeadsTable from "../Telecaller/LeadsTable";
import DailyReport from "../Telecaller/DailyReport";
import TelecallerChart from "../Telecaller/TelecallerChart";
import TelecallerDailyBarChart from "../Telecaller/TelecallerDailyBarChart";
import "./telecaller.css";

const TelecallerDashboard = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("name"));
  }, []);

  const [stats, setStats] = useState({
    total: 0,
    followups: 0,
    callbacks: 0,
    converted: 0,
    cold: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/telecaller/stats");
      setStats(res.data);
    } catch (error) {
      console.log("Stats Error:", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2>ExtraaEdge CRM</h2>

        <ul>
          <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li>

          <li
            className={activePage === "leads" ? "active" : ""}
            onClick={() => setActivePage("leads")}
          >
            My Leads
          </li>

          <li
            className={activePage === "report" ? "active" : ""}
            onClick={() => setActivePage("report")}
          >
            Daily Report
          </li>
        </ul>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* <div className="main-content"> */}
      <div
        className="main-content"
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <div className="topbar">
          <span className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </span>

          <h3>Telecaller Dashboard</h3>
          {/* <span>Welcome, {localStorage.getItem("name")}</span> */}
          <span>Welcome, {username || "User"}</span>
        </div>

        {activePage === "dashboard" && (
          <>
            <div className="stats-container">
              <div className="card">
                <h3>Total Leads</h3>
                <p>{stats.total}</p>
              </div>

              <div className="card">
                <h3>Follow Ups</h3>
                <p>{stats.followups}</p>
              </div>

              <div className="card">
                <h3>Callbacks</h3>
                <p>{stats.callbacks}</p>
              </div>

              <div className="card">
                <h3>Converted</h3>
                <p>{stats.converted}</p>
              </div>

              <div className="card">
                <h3>Cold Leads</h3>
                <p>{stats.cold}</p>
              </div>
            </div>

            <TelecallerChart />
          </>
        )}

        {activePage === "leads" && <LeadsTable />}
        {activePage === "report" && <DailyReport />}
        {activePage === "charts" && <TelecallerChart />}
        {activePage === "charts" && <TelecallerDailyBarChart />}
      </div>
    </div>
  );
};

export default TelecallerDashboard;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import LeadsTable from "../telecaller/LeadsTable";
// import DailyReport from "./DailyReport";

// import "./telecaller.css";

// const TelecallerDashboard = () => {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState("dashboard");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const [stats, setStats] = useState({
//     total: 0,
//     followups: 0,
//     callbacks: 0,
//     converted: 0,
//     cold: 0,
//   });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const res = await api.get("/telecaller/stats");
//       setStats(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="dashboard-container">
//       <div className={`sidebar ${menuOpen ? "open" : ""}`}>
//         <h2>ExtraaEdge CRM</h2>

//         <ul>
//           <li
//             className={activePage === "dashboard" ? "active" : ""}
//             onClick={() => setActivePage("dashboard")}
//           >
//             Dashboard
//           </li>

//           <li
//             className={activePage === "leads" ? "active" : ""}
//             onClick={() => setActivePage("leads")}
//           >
//             My Leads
//           </li>

//           <li
//             className={activePage === "report" ? "active" : ""}
//             onClick={() => setActivePage("report")}
//           >
//             Daily Report
//           </li>
//         </ul>

//         <button className="logout-btn" onClick={logout}>
//           Logout
//         </button>
//       </div>

//       <div className="main-content">
//         <div className="topbar">
//           <span className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
//             ☰
//           </span>

//           <h3>Telecaller Dashboard</h3>
//           <span>Welcome, {localStorage.getItem("name")}</span>
//         </div>

//         {activePage === "dashboard" && (
//           <div className="stats-container">
//             <div className="card">
//               <h3>Total Leads</h3>
//               <p>{stats.total}</p>
//             </div>

//             <div className="card">
//               <h3>Follow Ups</h3>
//               <p>{stats.followups}</p>
//             </div>

//             <div className="card">
//               <h3>Callbacks</h3>
//               <p>{stats.callbacks}</p>
//             </div>

//             <div className="card">
//               <h3>Converted</h3>
//               <p>{stats.converted}</p>
//             </div>

//             <div className="card">
//               <h3>Cold Leads</h3>
//               <p>{stats.cold}</p>
//             </div>
//           </div>
//         )}

//         {activePage === "leads" && <LeadsTable />}
//         {activePage === "report" && <DailyReport />}

//         {/* {activePage === "report" && (
//           <div style={{ padding: "20px" }}>
//             <h3>Daily Report Page Coming Soon...</h3>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default TelecallerDashboard;

// | Status    | Remarks Example        |
// | --------- | ---------------------- |
// | Follow-up | Asked to call tomorrow |
// | Callback  | Call after 5 PM        |
// | Converted | Admission confirmed    |
// | Cold      | Not interested         |

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../telecaller/telecaller.css";

// export default function TelecallerDashboard() {
//   const navigate = useNavigate();

//   const [activePage, setActivePage] = useState("dashboard");
//   const [leads, setLeads] = useState([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     followup: 0,
//     callback: 0,
//     converted: 0,
//     cold: 0,
//   });

//   const name = localStorage.getItem("name");

//   useEffect(() => {
//     loadStats();
//     loadLeads();
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const loadStats = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get("http://localhost:5000/api/telecaller/stats", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setStats(res.data);
//   };

//   const loadLeads = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get("http://localhost:5000/api/telecaller/leads", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setLeads(res.data);
//   };

//   const updateLead = async (id, status, remarks) => {
//     const token = localStorage.getItem("token");

//     await axios.put(
//       `http://localhost:5000/api/telecaller/lead/${id}`,
//       { status, remarks },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     loadLeads();
//     loadStats();
//   };

//   return (
//     <div className="telecaller-container">
//       {/* SIDEBAR */}
//       <div className="telecaller-sidebar">
//         <h2>Telecaller Panel</h2>

//         <ul>
//           <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
//           <li onClick={() => setActivePage("leads")}>My Leads</li>
//           <li onClick={() => setActivePage("report")}>Daily Report</li>
//           <li className="logout-btn" onClick={logout}>
//             Logout
//           </li>
//         </ul>
//       </div>

//       {/* MAIN SECTION */}
//       <div className="telecaller-main">
//         <div className="telecaller-topbar">
//           <h3>Telecaller Dashboard</h3>
//           <span>Welcome, {name}</span>
//         </div>

//         {activePage === "dashboard" && (
//           <div className="telecaller-stats">
//             <div className="stat-card">
//               <h4>Total Leads</h4>
//               <p>{stats.total}</p>
//             </div>

//             <div className="stat-card">
//               <h4>Follow Ups</h4>
//               <p>{stats.followup}</p>
//             </div>

//             <div className="stat-card">
//               <h4>Callbacks</h4>
//               <p>{stats.callback}</p>
//             </div>

//             <div className="stat-card">
//               <h4>Converted</h4>
//               <p>{stats.converted}</p>
//             </div>

//             <div className="stat-card">
//               <h4>Cold Leads</h4>
//               <p>{stats.cold}</p>
//             </div>
//           </div>
//         )}

//         {activePage === "leads" && (
//           <div>
//             <h2>My Assigned Leads</h2>

//             <table className="lead-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Mobile</th>
//                   <th>Course</th>
//                   <th>Status</th>
//                   <th>Remarks</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {leads.map((lead) => (
//                   <tr key={lead._id}>
//                     <td>{lead.name}</td>
//                     <td>{lead.mobile}</td>
//                     <td>{lead.course}</td>

//                     <td>
//                       <select
//                         onChange={(e) =>
//                           updateLead(
//                             lead._id,
//                             e.target.value,
//                             lead.remarks || ""
//                           )
//                         }
//                         value={lead.status}
//                       >
//                         <option value="assigned">Assigned</option>
//                         <option value="followup">Follow-Up</option>
//                         <option value="callback">Call Back</option>
//                         <option value="cold">Cold</option>
//                         <option value="converted">Converted</option>
//                       </select>
//                     </td>

//                     <td>
//                       <input
//                         type="text"
//                         placeholder="Add remarks"
//                         defaultValue={lead.remarks}
//                         onBlur={(e) =>
//                           updateLead(lead._id, lead.status, e.target.value)
//                         }
//                       />
//                     </td>

//                     <td>
//                       <button
//                         className="update-btn"
//                         onClick={() =>
//                           updateLead(lead._id, lead.status, lead.remarks)
//                         }
//                       >
//                         Save
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {activePage === "report" && <DailyReport leads={leads} />}
//       </div>
//     </div>
//   );
// }

// /* DAILY REPORT COMPONENT */

// function DailyReport({ leads }) {
//   return (
//     <div>
//       <h2>Daily Work Report</h2>

//       <table className="lead-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Mobile</th>
//             <th>Status</th>
//             <th>Remarks</th>
//           </tr>
//         </thead>

//         <tbody>
//           {leads.map((l) => (
//             <tr key={l._id}>
//               <td>{l.name}</td>
//               <td>{l.mobile}</td>
//               <td>{l.status}</td>
//               <td>{l.remarks}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
