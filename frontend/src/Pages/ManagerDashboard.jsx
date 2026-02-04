import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./manager.css";

/* ---------- SIDEBAR ---------- */
function Sidebar({ setActivePage }) {
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

/* ---------- MAIN DASHBOARD ---------- */
export default function ManagerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);

  const managerId = localStorage.getItem("userId");

  /* ---------- FETCH DASHBOARD STATS ---------- */
  useEffect(() => {
   

    axios.get("http://localhost:5000/api/manager/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });

  /* ---------- FETCH TELECALLER RECORDS ---------- */
  useEffect(() => {
    if (activePage === "telecallers") {
      axios
        .get("http://localhost:5000/api/manager/telecaller-records")
        .then((res) => setRecords(res.data))
        .catch((err) => console.log(err));
    }
  }, [activePage]);

  const filteredRecords = records.filter((r) =>
    r._id?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- EXCEL UPLOAD ---------- */
  const uploadExcel = async () => {
    if (!file) return alert("Please select a file");

    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("managerId", managerId);

    // await axios.post("http://localhost:5000/api/manager/upload", formData);

    // alert("Leads uploaded successfully");
    const formData = new FormData();
    formData.append("file", file);

    axios.post("http://localhost:5000/api/manager/upload", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return (
    <div className="admin-layout">
      <Sidebar setActivePage={setActivePage} />

      <div className="main-content">
        <div className="topbar">
          <h3>Manager Dashboard</h3>
          <span>Welcome, {localStorage.getItem("name")}</span>
          {/* <span>Welcome, Manager</span> */}
        </div>

        {/* ---------- DASHBOARD ---------- */}
        {activePage === "dashboard" && (
          <div className="cards">
            <div className="card">
              Total Leads
              <br />
              <b>{stats.total || 0}</b>
            </div>
            <div className="card">
              Assigned Leads
              <br />
              <b>{stats.assigned || 0}</b>
            </div>
            <div className="card">
              Converted Leads
              <br />
              <b>{stats.converted || 0}</b>
            </div>
          </div>
        )}

        {/* ---------- ASSIGN LEADS ---------- */}
        {activePage === "assign" && (
          <div>
            <h2>Assign Leads</h2>
            <p>Lead assignment UI comes next</p>
          </div>
        )}

        {/* ---------- TELECALLER RECORDS ---------- */}
        {activePage === "telecallers" && (
          <div>
            <h2>Telecaller Records</h2>

            <input
              type="text"
              placeholder="Search telecaller..."
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <table>
              <thead>
                <tr>
                  <th>Telecaller ID</th>
                  <th>Total Leads</th>
                  <th>Converted</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, index) => (
                  <tr key={index}>
                    <td>{r._id}</td>
                    <td>{r.total}</td>
                    <td>{r.converted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ---------- UPLOAD EXCEL ---------- */}
        {activePage === "upload" && (
          <div>
            <h2>Upload Leads (Excel)</h2>

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="upload-btn" onClick={uploadExcel}>
              Upload
            </button>

            <p>Columns: Name, Mobile, Course, Source</p>
          </div>
        )}

        {/* ---------- REPORTS ---------- */}
        {activePage === "reports" && (
          <div>
            <h2>Reports</h2>
            <p>Pie chart based on backend stats</p>
            <div className="chart-placeholder">📊 Chart Coming Next</div>
          </div>
        )}
      </div>
    </div>
  );
}
