
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import LeadsTable from "../telecaller/LeadsTable";
import DailyReport from "./DailyReport";
import TelecallerChart from "../telecaller/TelecallerChart";
import TelecallerDailyBarChart from "../telecaller/TelecallerDailyBarChart";

import "./telecaller.css";

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

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2>ExtraaEdge CRM</h2>

        <ul>
          <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li>

          <li
            className={activePage === "leads" ? "active" : ""}
            onClick={() => setActivePage("leads")}
          >
            My Leads
          </li>

          <li
            className={activePage === "report" ? "active" : ""}
            onClick={() => setActivePage("report")}
          >
            Daily Report
          </li>
        </ul>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

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
          {/* <span>Welcome, {localStorage.getItem("name")}</span> */}
          <span>Welcome, {username || "User"}</span>
        </div>

        {activePage === "dashboard" && (
          <>
            <div className="stats-container">
              <div className="card">
                <h3>Total Leads</h3>
                <p>{stats.total}</p>
              </div>

              <div className="card">
                <h3>Follow Ups</h3>
                <p>{stats.followups}</p>
              </div>

              <div className="card">
                <h3>Callbacks</h3>
                <p>{stats.callbacks}</p>
              </div>

              <div className="card">
                <h3>Converted</h3>
                <p>{stats.converted}</p>
              </div>

              <div className="card">
                <h3>Cold Leads</h3>
                <p>{stats.cold}</p>
              </div>
            </div>

            <TelecallerChart />
          </>
        )}

        {activePage === "leads" && <LeadsTable />}
        {activePage === "report" && <DailyReport />}
        {activePage === "charts" && <TelecallerChart />}
        {activePage === "charts" && <TelecallerDailyBarChart />}
      </div>
    </div>
  );
};

export default TelecallerDashboard;
