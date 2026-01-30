import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActivePage }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">ExtraaEdge CRM</h2>

      <ul>
        <li onClick={() => setActivePage("dashboard")}>🏠 Dashboard</li>
        <li onClick={() => setActivePage("assign")}>📌 Assign Leads</li>
        <li onClick={() => setActivePage("telecallers")}>
          📞 Telecaller Records
        </li>
        <li onClick={() => setActivePage("upload")}>📤 Upload Excel</li>
        <li onClick={() => setActivePage("reports")}>📊 Reports</li>
      </ul>

      <button className="logout" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}
