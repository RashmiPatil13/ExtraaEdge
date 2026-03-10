import React from "react";
import { motion } from "framer-motion";
import "./HeroIllustration.css";

const HeroIllustration = () => {
  return (
    <div className="hero-illustration">
      {/* Dashboard */}

      <motion.div
        initial={{ rotateY: -5, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="dashboard"
      >
        {/* Sidebar */}

        <div className="sidebar">
          <div className="menu-logo">
            <div className="menu-square"></div>
          </div>

          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>

          <div className="menu-bottom"></div>
        </div>

        {/* Main Content */}

        <div className="dashboard-content">
          {/* Header */}

          <div className="dashboard-header">
            <div className="header-bar"></div>

            <div className="header-icons">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot active"></div>
            </div>
          </div>

          {/* Grid */}

          <div className="dashboard-grid">
            {/* Bar Chart */}

            <div className="chart-box">
              <div className="bars">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "30%" }}
                  className="bar green"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "50%" }}
                  className="bar yellow"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "40%" }}
                  className="bar darkblue"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "60%" }}
                  className="bar blue"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "75%" }}
                  className="bar orange"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "85%" }}
                  className="bar orange-light"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "45%" }}
                  className="bar green-dark"
                />
              </div>
            </div>

            {/* Donut Chart */}

            <div className="donut-box">
              <svg viewBox="0 0 100 100" className="donut">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="20"
                />

                <motion.circle
                  initial={{ strokeDasharray: "0 251" }}
                  animate={{ strokeDasharray: "70 251" }}
                  transition={{ delay: 1, duration: 1 }}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="20"
                />
              </svg>
            </div>

            {/* Stats */}

            <div className="stats-box">
              <div className="stat-row">
                <div className="stat-icon green-bg"></div>
                <div className="stat-bars">
                  <div className="stat-bar"></div>
                  <div className="stat-bar small"></div>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-icon orange-bg"></div>
                <div className="stat-bars">
                  <div className="stat-bar"></div>
                  <div className="stat-bar half"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Magnifier */}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="magnifier"
      >
        <svg width="180" height="180" viewBox="0 0 200 200">
          <line
            x1="130"
            y1="130"
            x2="170"
            y2="170"
            stroke="#1e3a8a"
            strokeWidth="20"
            strokeLinecap="round"
          />

          <circle
            cx="90"
            cy="90"
            r="55"
            fill="rgba(219,234,254,0.9)"
            stroke="#1e3a8a"
            strokeWidth="12"
          />
        </svg>
      </motion.div>

      {/* Chat Bubble */}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="chat-bubble"
      >
        <div className="bubble">
          <div className="typing"></div>
          <div className="typing"></div>
          <div className="typing"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroIllustration;
