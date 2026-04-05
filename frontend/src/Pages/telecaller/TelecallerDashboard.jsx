import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import LeadsTable from "../telecaller/LeadsTable";
import DailyReport from "./DailyReport";
import TelecallerChart from "../telecaller/TelecallerChart";
import TelecallerDailyBarChart from "../telecaller/TelecallerDailyBarChart";
import {
  FaUsers,
  FaPhone,
  FaRedo,
  FaCheckCircle,
  FaSnowflake,
} from "react-icons/fa";

import "./telecaller.css";
import TelecallerSetting from "./TelecallerSetting";

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
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/user/notifications");

      res.data.forEach((n) => {
        toast.info(n.message);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* <div className={`sidebar ${menuOpen ? "open" : ""}`}> */}
      <div className={`sidebar ${menuOpen ? "active" : ""}`}>
        <h2>ExtraaEdge CRM</h2>

        <ul>
          {/* <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li> */}
          <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => {
              setActivePage("dashboard");
              setMenuOpen(false);
            }}
          >
            Dashboard
          </li>

          {/* <li
            className={activePage === "leads" ? "active" : ""}
            onClick={() => setActivePage("leads")}
          >
            My Leads
          </li> */}
          <li
            className={activePage === "leads" ? "active" : ""}
            onClick={() => {
              setActivePage("leads");
              setMenuOpen(false);
            }}
          >
            My Leads
          </li>

          {/* <li
            className={activePage === "report" ? "active" : ""}
            onClick={() => setActivePage("report")}
          >
            Daily Report
          </li> */}
          <li
            className={activePage === "report" ? "active" : ""}
            onClick={() => {
              setActivePage("report");
              setMenuOpen(false);
            }}
          >
            Daily Report
          </li>
          <li
            className={activePage === "setting" ? "active" : ""}
            onClick={() => {
              setActivePage("setting");
              setMenuOpen(false);
            }}
          >
            Settings
          </li>
        </ul>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}

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

          <span>Welcome, {username || "User"}</span>
        </div>

        {activePage === "dashboard" && (
          <>
            <div className="manager-stats">
              <div className="manager-card">
                <div className="icon total-icon">
                  <FaUsers />
                </div>
                <h4>Total Leads</h4>
                <p>{stats.total}</p>
              </div>
              <div className="manager-card">
                <div className="icon followup-icon">
                  <FaRedo />
                </div>
                <h4>Follow Ups</h4>
                <p>{stats.followups}</p>
              </div>
              <div className="manager-card">
                <div className="icon callback-icon">
                  <FaPhone />
                </div>
                <h4>Callbacks</h4>
                <p>{stats.callbacks}</p>
              </div>{" "}
              <div className="manager-card">
                <div className="icon converted-icon">
                  <FaCheckCircle />
                </div>
                <h4>Converted</h4>
                <p>{stats.converted}</p>
              </div>
              <br></br>
              <div className="manager-card">
                <div className="icon cold-icon">
                  <FaSnowflake />
                </div>
                <h4>Cold Leads</h4>
                <p>{stats.cold}</p>
              </div>
            </div>

            <div className="chart-box">
              <TelecallerChart />
              {/* <TelecallerDailyBarChart /> */}
            </div>
          </>
        )}

        {activePage === "leads" && <LeadsTable />}
        {activePage === "report" && <DailyReport />}
        {activePage === "charts" && <TelecallerChart />}
        {activePage === "charts" && <TelecallerDailyBarChart />}
        {activePage === "setting" && <TelecallerSetting />}
      </div>
    </div>
  );
};

export default TelecallerDashboard;
