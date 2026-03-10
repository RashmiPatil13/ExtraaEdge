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
import { useState, useEffect } from "react";
import api from "../utils/api";
// import "../manager/manager.css";

export default function Sidebar({ setActivePage }) {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [notifications, setNotifications] = useState([]);

  const handleClick = async (page) => {
    setActive(page);
    setActivePage(page);

    if (page === "settings") {
      try {
        await api.put("/notifications/mark-read");

        // update state locally so dot disappears immediately
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await api.get("/notifications");
    setNotifications(res.data);
  };
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // useEffect(() => {
  //   fetchNotifications();

  //   const interval = setInterval(fetchNotifications, 10000);

  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div className="sidebar">
      {/* <div className="sidebar-top"> */}
      {/* <img src="logo.png" alt="logo" className="sidebar-logo" /> */}
      <h2>ExtraaEdge</h2>
      {/* </div> */}

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
        <li onClick={() => handleClick("settings")}>
          ⚙️ Settings
          {unreadCount > 0 && <span className="notification-dot"></span>}
        </li>
      </ul>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}
