import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/api";

export default function Sidebar({
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [notifications, setNotifications] = useState([]);

  const handleClick = async (page) => {
    setActive(page);
    setActivePage(page);

    // close sidebar on mobile after click
    setSidebarOpen(false);

    if (page === "settings") {
      try {
        await api.put("/notifications/mark-read");
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

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await api.get("/notifications");
    setNotifications(res.data);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
      <h2>ExtraaEdge</h2>

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
          {/* {unreadCount > 0 && <span className="notification-dot"></span>} */}
        </li>
      </ul>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}
