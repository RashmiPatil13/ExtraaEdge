import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";

import "./admin.css";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true);
  }, []);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {/* <AdminSidebar setActivePage={setActivePage} /> */}
      {/*  SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">
          {" "}
          <img src="images/logo.png" alt="" />
          ExtraaEdge CRM
        </h2>

        <ul>
          <li onClick={() => setActivePage("dashboard")}>🏠 Dashboard</li>
          <li onClick={() => setActivePage("managers")}>👤 Manage Managers</li>
          <li onClick={() => setActivePage("telecallers")}>
            📞 Manage Telecallers
          </li>
          <li>📊 Lead Reports</li>
          <li>⚙️ Settings</li>
          <li className="logout" onClick={logout}>
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOP BAR */}
        <div className="topbar">
          <h3>Admin Dashboard</h3>
          <div className="admin-info">
            <span>Welcome, Admin</span>
            <img
              className="admin-image"
              src="images/admin_image.png"
              alt="admin"
            />
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="page-content">
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "managers" && <ManageManagers />}
          {activePage === "telecallers" && <ManageTelecallers />}
        </div>
      </div>

      {/* WELCOME MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>👋 Welcome Admin</h2>
            <p>You have full access to manage the CRM system.</p>
            <button onClick={() => setShowModal(false)}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* DASHBOARD */

function Dashboard() {
  return (
    <div className="dashboard-cards">
      <div className="card">Total Leads</div>
      <div className="card">Managers</div>
      <div className="card">Telecallers</div>
      <div className="card">Conversions</div>
    </div>
  );
}

/* MANAGE MANAGERS */

function ManageManagers() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users");
    setManagers(res.data.filter((u) => u.role === "manager"));
  };

  const approveUser = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
    fetchManagers();
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete this manager?")) {
      await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
      fetchManagers();
    }
  };

  return (
    <div>
      <h2>Manage Managers</h2>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {managers.map((m) => (
              <tr key={m._id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.isApproved ? "Approved" : "Pending"}</td>
                <td className="actions">
                  {!m.isApproved && (
                    <button onClick={() => approveUser(m._id)}>Approve</button>
                  )}
                  <button onClick={() => deleteUser(m._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*  MANAGE TELECALLERS  */

function ManageTelecallers() {
  const [telecallers, setTelecallers] = useState([]);

  useEffect(() => {
    fetchTelecallers();
  }, []);

  const fetchTelecallers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users");
    setTelecallers(res.data.filter((u) => u.role === "telecaller"));
  };

  const approveUser = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
    fetchTelecallers();
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete this telecaller?")) {
      await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
      fetchTelecallers();
    }
  };

  return (
    <div>
      <h2>Manage Telecallers</h2>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {telecallers.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.isApproved ? "Approved" : "Pending"}</td>
                <td className="actions">
                  {!t.isApproved && (
                    <button onClick={() => approveUser(t._id)}>Approve</button>
                  )}
                  <button onClick={() => deleteUser(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
