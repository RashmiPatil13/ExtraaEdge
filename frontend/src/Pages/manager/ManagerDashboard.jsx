// import { useState, useEffect } from "react";
// import api from "../utils/api";

// import Sidebar from "./Sidebar";
// import Dashboard from "./Dashboard";
// import AssignLeads from "./AssignLeads";
// import TelecallerRecords from "./TelecallerRecords";
// import UploadExcel from "./UploadExcel";

// import ManagerDateAnalytics from "./ManagerDateAnalytics";
// import ManagerLeadsTable from "./ManagerLeadsTable";
// import Report from "./Report";
// import ManagerSetting from "./ManagerSetting";
// import { toast } from "react-toastify";
// import "./manager.css";

// export default function ManagerDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const name = localStorage.getItem("name");

//   const [status, setStatus] = useState("");
//   const [leads, setLeads] = useState([]);
//   const [showReport, setShowReport] = useState(false);

//   useEffect(() => {
//     api
//       .get(`/manager/leads?status=${status}`)
//       .then((res) => setLeads(res.data))
//       .catch((err) => console.log(err));
//   }, [status]);

//   return (
//     <div className="admin-layout">
//       <Sidebar setActivePage={setActivePage} />
//       <div className="mobile-header">
//         <button
//           className="hamburger"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           ☰
//         </button>
//         {/* <div className="main-content"> */}
//         <div
//           className="main-content"
//           style={{ height: "100vh", overflowY: "auto" }}
//         >
//           <div className="topbar">
//             <h3>Manager Dashboard</h3>

//             <span style={{ color: "#f97316", fontWeight: "bold" }}>
//               Welcome, {name}
//             </span>

//             {/* <span>Welcome, Manager</span> */}
//           </div>

//           {activePage === "dashboard" && (
//             <>
//               <Dashboard setActivePage={setActivePage} setStatus={setStatus} />
//               <ManagerDateAnalytics />
//             </>
//           )}

//           {activePage === "assign" && <AssignLeads />}
//           {activePage === "telecallers" && <TelecallerRecords />}
//           {activePage === "upload" && <UploadExcel />}
//           {activePage === "reports" && <Report />}
//           {/* {activePage == "leads" && <ManagerDateAnalytics />} */}
//           {activePage === "leads" && (
//             <ManagerLeadsTable leads={leads} setLeads={setLeads} />
//           )}
//           {activePage === "settings" && <ManagerSetting />}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import api from "../utils/api";

import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import AssignLeads from "./AssignLeads";
import TelecallerRecords from "./TelecallerRecords";
import UploadExcel from "./UploadExcel";
import ManagerDateAnalytics from "./ManagerDateAnalytics";
import ManagerLeadsTable from "./ManagerLeadsTable";
import Report from "./Report";
import ManagerSetting from "./ManagerSetting";

import "./manager.css";

export default function ManagerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const name = localStorage.getItem("name");

  const [status, setStatus] = useState("");
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api
      .get(`/manager/leads?status=${status}`)
      .then((res) => setLeads(res.data))
      .catch((err) => console.log(err));
  }, [status]);

  return (
    <div className="admin-layout">
      {/* MOBILE HEADER */}
      <div className="mobile-header">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <h3>ExtraaEdge</h3>
      </div>

      <Sidebar
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="main-content">
        <div className="topbar">
          <h3>Manager Dashboard</h3>

          <span style={{ color: "#f97316", fontWeight: "bold" }}>
            Welcome, {name}
          </span>
        </div>

        {activePage === "dashboard" && (
          <>
            <Dashboard setActivePage={setActivePage} setStatus={setStatus} />
            <ManagerDateAnalytics />
          </>
        )}

        {activePage === "assign" && <AssignLeads />}
        {activePage === "telecallers" && <TelecallerRecords />}
        {activePage === "upload" && <UploadExcel />}
        {activePage === "reports" && <Report />}
        {activePage === "leads" && (
          <ManagerLeadsTable leads={leads} setLeads={setLeads} />
        )}
        {activePage === "settings" && <ManagerSetting />}
      </div>
    </div>
  );
}
