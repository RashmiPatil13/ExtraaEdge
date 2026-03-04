import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./admin.css";

/*  SIDEBAR COMPONENT  */
// function Sidebar({ setActivePage }) {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState("dashboard");
//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="sidebar">
//       <h2 className="logo">ExtraaEdge CRM</h2>

//       <ul>
//         <li
//           className={activePage === "dashboard" ? "active" : ""}
//           onClick={() => setActivePage("dashboard")}
//         >
//           🏠 Dashboard
//         </li>

//         <li
//           className={activePage === "managers" ? "active" : ""}
//           onClick={() => setActivePage("managers")}
//         >
//           👤 Manage Managers
//         </li>

//         <li
//           className={activePage === "telecallers" ? "active" : ""}
//           onClick={() => setActivePage("telecallers")}
//         >
//           📞 Manage Telecallers
//         </li>

//         <li
//           className={activePage === "leadReports" ? "active" : ""}
//           onClick={() => setActivePage("leadReports")}
//         >
//           📊 Lead Reports
//         </li>
//       </ul>

//       <button className="logout" onClick={logout}>
//         🚪 Logout
//       </button>
//     </div>
//   );
// }

function Sidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">ExtraaEdge CRM</h2>

      <ul>
        <li
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          🏠 Dashboard
        </li>

        <li
          className={activePage === "managers" ? "active" : ""}
          onClick={() => setActivePage("managers")}
        >
          👤 Manage Managers
        </li>

        <li
          className={activePage === "telecallers" ? "active" : ""}
          onClick={() => setActivePage("telecallers")}
        >
          📞 Manage Telecallers
        </li>

        <li
          className={activePage === "leadReports" ? "active" : ""}
          onClick={() => setActivePage("leadReports")}
        >
          📊 Lead Reports
        </li>
      </ul>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}

// /*  MAIN ADMIN DASHBOARD  */
export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="main-content">
        <div className="topbar">
          <h3>Admin Dashboard</h3>
          <span>Welcome, Admin</span>
        </div>

        <div className="page-content">
          {activePage === "dashboard" && <h2>Dashboard</h2>}
          {activePage === "managers" && <h2>Manage Managers</h2>}
          {activePage === "telecallers" && <h2>Manage Telecallers</h2>}
        </div>
      </div>
    </div>
  );
}
