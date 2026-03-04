// import { useNavigate } from "react-router-dom";

// export default function Sidebar({ setActivePage }) {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="sidebar">
//       <h2 className="logo">ExtraaEdge CRM</h2>

//       <ul>
//         <li onClick={() => setActivePage("dashboard")}>🏠 Dashboard</li>
//         <li onClick={() => setActivePage("assign")}>📌 Assign Leads</li>
//         <li onClick={() => setActivePage("telecallers")}>
//           📞 Telecaller Records
//         </li>
//         <li onClick={() => setActivePage("upload")}>📤 Upload Excel</li>
//         <li onClick={() => setActivePage("leads")}>📊 Leads List</li>
//         <li onClick={() => setActivePage("reports")}>📊 Reports</li>
//       </ul>

//       <button className="logout" onClick={logout}>
//         🚪 Logout
//       </button>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ setActivePage }) {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  const handleClick = (page) => {
    setActive(page);
    setActivePage(page);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      {/* Top Orange Header with Logo */}
      <div className="sidebar-top">
        <img src="logo.png" alt="logo" className="sidebar-logo" />
        <h2>ExtraaEdge</h2>
      </div>

      {/* Menu */}
      <ul className="menu">
        <li
          className={active === "dashboard" ? "active" : ""}
          onClick={() => handleClick("dashboard")}
        >
          🏠 Dashboard
        </li>

        <li
          className={active === "assign" ? "active" : ""}
          onClick={() => handleClick("assign")}
        >
          📌 Assign Leads
        </li>

        <li
          className={active === "telecallers" ? "active" : ""}
          onClick={() => handleClick("telecallers")}
        >
          📞 Telecaller Records
        </li>

        <li
          className={active === "upload" ? "active" : ""}
          onClick={() => handleClick("upload")}
        >
          📤 Upload Excel
        </li>

        <li
          className={active === "leads" ? "active" : ""}
          onClick={() => handleClick("leads")}
        >
          📊 Leads List
        </li>

        <li
          className={active === "reports" ? "active" : ""}
          onClick={() => handleClick("reports")}
        >
          📊 Reports
        </li>
      </ul>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}
