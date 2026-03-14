// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import api from "./utils/api";

// import "./admin.css";

// export default function AdminDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [showModal, setShowModal] = useState(true);

//   useEffect(() => {
//     setShowModal(true);
//   }, []);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="admin-layout">
//       {/* <AdminSidebar setActivePage={setActivePage} /> */}
//       {/*  SIDEBAR */}
//       <div className="sidebar">
//         <h2 className="logo">
//           {" "}
//           <img src="images/logo.png" alt="" />
//           ExtraaEdge CRM
//         </h2>

//         <ul>
//           <li onClick={() => setActivePage("dashboard")}>🏠 Dashboard</li>
//           <li onClick={() => setActivePage("managers")}>👤 Manage Managers</li>
//           <li onClick={() => setActivePage("telecallers")}>
//             📞 Manage Telecallers
//           </li>
//           <li>📊 Lead Reports</li>
//           <li>⚙️ Settings</li>
//           <li className="logout" onClick={logout}>
//             🚪 Logout
//           </li>
//         </ul>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="main-content">
//         {/* TOP BAR */}
//         <div className="topbar">
//           <h3>Admin Dashboard</h3>
//           <div className="admin-info">
//             <span>Welcome, Admin</span>
//             <img
//               className="admin-image"
//               src="images/admin_image.png"
//               alt="admin"
//             />
//           </div>
//         </div>

//         {/* PAGE CONTENT */}
//         <div className="page-content">
//           {activePage === "dashboard" && <Dashboard />}
//           {activePage === "managers" && <ManageManagers />}
//           {activePage === "telecallers" && <ManageTelecallers />}
//         </div>
//       </div>

//       {/* WELCOME MODAL */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>👋 Welcome Admin</h2>
//             <p>You have full access to manage the CRM system.</p>
//             <button onClick={() => setShowModal(false)}>Continue</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* DASHBOARD */

// function Dashboard() {
//   return (
//     <div className="dashboard-cards">
//       <div className="card">Total Leads</div>
//       <div className="card">Managers</div>
//       <div className="card">Telecallers</div>
//       <div className="card">Conversions</div>
//     </div>
//   );
// }

// /* MANAGE MANAGERS */

// function ManageManagers() {
//   const [managers, setManagers] = useState([]);

//   useEffect(() => {
//     fetchManagers();
//   }, []);

//   const token = localStorage.getItem("token");

//   // const fetchManagers = async () => {
//   //   const res = await axios.get("http://localhost:5000/api/admin/users");
//   //   setManagers(res.data.filter((u) => u.role === "manager"));
//   // };

//   // const approveUser = async (id) => {
//   //   await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
//   //   fetchManagers();
//   // };

//   // const deleteUser = async (id) => {
//   //   if (window.confirm("Delete this manager?")) {
//   //     await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
//   //     fetchManagers();
//   //   }
//   // };
//   // const fetchManagers = async () => {
//   //   const token = localStorage.getItem("token");

//   //   const res = await axios.get("http://localhost:5000/api/admin/users", {
//   //     headers: {
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //   });

//   const fetchManagers = async () => {
//     try {
//       const res = await api.get("/admin/users");
//       setManagers(res.data.filter((u) => u.role === "manager"));
//     } catch (error) {
//       console.log(error);
//       alert("Failed to load managers");
//     }
//   };

//   const approveUser = async (id) => {
//     try {
//       await api.put(`/admin/approve/${id}`);
//       fetchManagers();
//     } catch (error) {
//       alert("Approval failed");
//     }
//   };

//   const deleteUser = async (id) => {
//     if (window.confirm("Delete this manager?")) {
//       try {
//         await api.delete(`/admin/delete/${id}`);
//         fetchManagers();
//       } catch (error) {
//         alert("Delete failed");
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Managers</h2>

//       <div className="table-card">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {managers.map((m) => (
//               <tr key={m._id}>
//                 <td>{m.name}</td>
//                 <td>{m.email}</td>
//                 <td>{m.isApproved ? "Approved" : "Pending"}</td>
//                 <td className="actions">
//                   {!m.isApproved && (
//                     <button onClick={() => approveUser(m._id)}>Approve</button>
//                   )}
//                   <button onClick={() => deleteUser(m._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /*  MANAGE TELECALLERS  */

// function ManageTelecallers() {
//   const [telecallers, setTelecallers] = useState([]);

//   useEffect(() => {
//     fetchTelecallers();
//   }, []);

//   // const fetchTelecallers = async () => {
//   //   const res = await axios.get("http://localhost:5000/api/admin/users");
//   //   setTelecallers(res.data.filter((u) => u.role === "telecaller"));
//   // };

//   // const approveUser = async (id) => {
//   //   await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
//   //   fetchTelecallers();
//   // };

//   // const deleteUser = async (id) => {
//   //   if (window.confirm("Delete this telecaller?")) {
//   //     await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
//   //     fetchTelecallers();
//   //   }
//   // };

//   const fetchTelecallers = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get("http://localhost:5000/api/admin/users", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     setTelecallers(res.data.filter((u) => u.role === "telecaller"));
//   };
//   const approveUser = async (id) => {
//     const token = localStorage.getItem("token");

//     await axios.put(
//       `http://localhost:5000/api/admin/approve/${id}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     fetchTelecallers();
//   };
//   const deleteUser = async (id) => {
//     const token = localStorage.getItem("token");

//     if (window.confirm("Delete this telecaller?")) {
//       await axios.delete(`http://localhost:5000/api/admin/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       fetchTelecallers();
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Telecallers</h2>
//       <div className="table-card">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {telecallers.map((t) => (
//               <tr key={t._id}>
//                 <td>{t.name}</td>
//                 <td>{t.email}</td>
//                 <td>{t.isApproved ? "Approved" : "Pending"}</td>
//                 <td className="actions">
//                   {!t.isApproved && (
//                     <button onClick={() => approveUser(t._id)}>Approve</button>
//                   )}
//                   <button onClick={() => deleteUser(t._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import LeadReports from "./LeadReports";
import Settings from "./Settings";
import { FaUsers, FaUserTie, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./admin.css";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [showModal, setShowModal] = useState(true);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadFilter, setLeadFilter] = useState("all");

  const [stats, setStats] = useState({
    totalLeads: 0,
    totalManagers: 0,
    totalTelecallers: 0,
    totalConversions: 0,
  });

  useEffect(() => {
    setShowModal(true);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      // alert("Access Denied: Admins Only");
      toast.error("Access Denied: Admins Only!");

      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");

      setStats(res.data);

      // Format chart data
      const formattedData = res.data.leadsByDate.map((item) => ({
        date: item._id,
        leads: item.count,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      {/* <div className="sidebar"> */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2>ExtraaEdge CRM</h2>

        <ul>
          <li onClick={() => setActivePage("dashboard")}>🏠 Dashboard</li>
          <li onClick={() => setActivePage("managers")}>👤 Manage Managers</li>
          <li onClick={() => setActivePage("telecallers")}>
            📞 Manage Telecallers
          </li>
          <li onClick={() => setActivePage("leadReports")}>📊 Lead Reports</li>
          {/* <li onClick={() => setActivePage("settings")}>
            ⚙️ Settings
            {unreadCount > 0 && <span className="notification-dot"></span>}
          </li> */}
          <li
            className="settings-menu"
            onClick={async () => {
              setActivePage("settings");

              try {
                await api.put("/notifications/mark-read");

                // remove dot instantly
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, isRead: true }))
                );
              } catch (err) {
                console.log(err);
              }
            }}
          >
            ⚙️ Settings
            {unreadCount > 0 && <span className="notification-dot"></span>}
          </li>

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

        <div className="page-content">
          {/* {activePage === "dashboard" && <Dashboard />} */}
          {activePage === "dashboard" && (
            <Dashboard
              stats={stats}
              chartData={chartData}
              setActivePage={setActivePage}
              setLeadFilter={setLeadFilter}
            />
          )}
          {activePage === "managers" && <ManageManagers />}
          {activePage === "telecallers" && <ManageTelecallers />}
          {/* {activePage === "leadReports" && <LeadReports />} */}
          {/* {activePage === "leadReports" && <LeadReports />} */}
          {activePage === "leadReports" && <LeadReports filter={leadFilter} />}
          {activePage === "settings" && <Settings />}
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

// function Dashboard() {
//   return (
//     <div className="dashboard-cards">
//       <div className="card">Total Leads</div>
//       <div className="card">Managers</div>
//       <div className="card">Telecallers</div>
//       <div className="card">Conversions</div>
//     </div>
//   );
// }

/* DASHBOARD */

// function Dashboard({ stats, chartData }) {
//   return (
//     <>
//       <div className="dashboard-cards">
//         <div className="card">
//           <div className="icon orange">
//             <FaUsers />
//           </div>
//           <h4>Total Leads</h4>
//           <h2>{stats.totalLeads}</h2>
//         </div>

//         <div className="card">
//           <div className="icon blue">
//             <FaUserTie />
//           </div>
//           <h4>Managers</h4>
//           <h2>{stats.totalManagers}</h2>
//         </div>

//         <div className="card">
//           <div className="icon green">
//             <FaPhoneAlt />
//           </div>
//           <h4>Telecallers</h4>
//           <h2>{stats.totalTelecallers}</h2>
//         </div>

//         <div className="card">
//           <div className="icon purple">
//             <FaCheckCircle />
//           </div>
//           <h4>Conversions</h4>
//           <h2>{stats.totalConversions}</h2>
//         </div>
//       </div>

//       {/* GRAPH */}
//       <div className="chart-card">
//         <h3>Date Wise Leads Analytics</h3>

//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartData}>
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="leads"
//               stroke="#6366f1"
//               strokeWidth={3}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </>
//   );
// }

// function Dashboard({ stats, chartData, setActivePage }) {
//   return (
function Dashboard({ stats, chartData, setActivePage, setLeadFilter }) {
  return (
    <>
      {/* TOTAL LEADS */}

      <div className="dashboard-cards">
        {/* TOTAL LEADS */}
        <div
          className="card"
          onClick={() => {
            setLeadFilter("all");
            setActivePage("leadReports");
          }}
        >
          <div className="icon orange">
            <FaUsers />
          </div>
          <h4>Total Leads</h4>
          <h2>{stats.totalLeads}</h2>
        </div>

        {/* MANAGERS */}
        <div className="card" onClick={() => setActivePage("managers")}>
          <div className="icon blue">
            <FaUserTie />
          </div>
          <h4>Managers</h4>
          <h2>{stats.totalManagers}</h2>
        </div>

        {/* TELECALLERS */}
        <div className="card" onClick={() => setActivePage("telecallers")}>
          <div className="icon green">
            <FaPhoneAlt />
          </div>
          <h4>Telecallers</h4>
          <h2>{stats.totalTelecallers}</h2>
        </div>

        {/* CONVERSIONS */}
        <div
          className="card"
          onClick={() => {
            setLeadFilter("converted");
            setActivePage("leadReports");
          }}
        >
          <div className="icon purple">
            <FaCheckCircle />
          </div>
          <h4>Conversions</h4>
          <h2>{stats.totalConversions}</h2>
        </div>
      </div>

      {/* GRAPH */}
      <div className="chart-card">
        <h3>Date Wise Leads Analytics</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

/* MANAGE MANAGERS */

function ManageManagers() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const res = await api.get("/admin/users");
      setManagers(res.data.filter((u) => u.role === "manager"));
    } catch (error) {
      console.log(error);
      // alert("Failed to load managers");
      toast.error("Failed to load managers!");
    }
  };

  // const approveUser = async (id) => {
  //   try {
  //     await api.put(`/admin/approve/${id}`);
  //     fetchManagers();
  //   } catch (error) {
  //     alert("Approval failed");
  //   }
  // };

  // const disapproveUser = async (id) => {
  //   try {
  //     await api.put(`/admin/disapprove/${id}`);
  //     fetchManagers();
  //   } catch (error) {
  //     alert("Disapprove failed");
  //   }
  // };
  const toggleApproval = async (id) => {
    try {
      await api.put(`/admin/toggle-approval/${id}`);
      fetchManagers();
    } catch (error) {
      // alert("Action failed");
      toast.error("Action failed!");
    }
  };

  // const deleteUser = async (id) => {

  //     if (window.confirm("Delete this manager?")) {
  //     try {
  //       await api.delete(`/admin/delete/${id}`);
  //       fetchManagers();
  //     } catch (error) {
  //       // alert("Delete failed");
  //       toast.error("Delete failed!");
  //     }
  //   }
  // };
  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This manager will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4d4d",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/admin/delete/${id}`);
          fetchManagers();

          Swal.fire("Deleted!", "Manager has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Delete failed.", "error");
        }
      }
    });
  };

  return (
    <div>
      <h2 style={{ margin: "20px" }}>Manage Managers</h2>

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
                  {/* {!m.isApproved && (
                    <button
                      className="approve-btn"
                      onClick={() => approveUser(m._id)}
                    >
                      Approve
                    </button>
                  )} */}
                  {/* {m.isApproved ? (
                    <button
                      className="disapprove-btn"
                      onClick={() => disapproveUser(m._id)}
                    >
                      Disapprove
                    </button>
                  ) : (
                    <button
                      className="approve-btn"
                      onClick={() => approveUser(m._id)}
                    >
                      Approve
                    </button>
                  )} */}

                  <td className="actions">
                    <button
                      className={`toggle-btn ${
                        m.isApproved ? "approved" : "pending"
                      }`}
                      onClick={() => toggleApproval(m._id)}
                    >
                      {m.isApproved ? "Disapprove" : "Approve"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(m._id)}
                    >
                      Delete
                    </button>
                  </td>

                  {/* <button
                    className="delete-btn"
                    onClick={() => deleteUser(m._id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* MANAGE TELECALLERS */

function ManageTelecallers() {
  const [telecallers, setTelecallers] = useState([]);

  useEffect(() => {
    fetchTelecallers();
  }, []);

  const fetchTelecallers = async () => {
    try {
      const res = await api.get("/admin/users");
      setTelecallers(res.data.filter((u) => u.role === "telecaller"));
    } catch (error) {
      console.log(error);
      // alert("Failed to load telecallers");
      toast.error("Failed to load telecallers");
    }
  };

  // const approveUser = async (id) => {
  //   try {
  //     await api.put(`/admin/approve/${id}`);
  //     fetchTelecallers();
  //   } catch (error) {
  //     alert("Approval failed");
  //   }
  // };
  const toggleApproval = async (id) => {
    try {
      await api.put(`/admin/toggle-approval/${id}`);
      fetchTelecallers();
    } catch (error) {
      // alert("Action failed");
      toast.error("Action failed..!");
    }
  };

  // const deleteUser = async (id) => {
  //   if (window.confirm("Delete this telecaller?")) {
  //     try {
  //       await api.delete(`/admin/delete/${id}`);
  //       fetchTelecallers();
  //     } catch (error) {
  //       alert("Delete failed");
  //     }
  //   }
  // };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Telecaller will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4d4d",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/admin/delete/${id}`);
          fetchTelecallers();

          Swal.fire("Deleted!", "Telecaller has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Delete failed.", "error");
        }
      }
    });
  };

  return (
    <div>
      <h2 style={{ margin: "20px" }}>Manage Telecallers</h2>
      <div className="table-container">
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
                    {/* {!t.isApproved && (
                    <button onClick={() => approveUser(t._id)}>Approve</button>
                  )}
                  <button onClick={() => deleteUser(t._id)}>Delete</button> */}
                    <td className="actions">
                      <button
                        className={`toggle-btn ${
                          t.isApproved ? "approved" : "pending"
                        }`}
                        onClick={() => toggleApproval(t._id)}
                      >
                        {t.isApproved ? "Disapprove" : "Approve"}
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(t._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
