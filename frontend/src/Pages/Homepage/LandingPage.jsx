import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // ✅ FIXED
import logo from "../../assets/logo.png"; // ✅ FIXED
import tableImg from "../../assets/table.png"; // ✅ FIXED

const LandingPage = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const navigate = useNavigate();

  const navItems = ["Home", "Features", "Roles", "Tech Stack", "Contact"];

  // Handle nav click
  const handleNavClick = (item) => {
    setActiveNav(item);

    if (item === "Contact") {
      navigate("/contact");
      return;
    }

    const section = document.getElementById(item.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Highlight nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "Home";

      navItems.forEach((item) => {
        if (item === "Contact") return;

        const section = document.getElementById(item.toLowerCase());
        if (section) {
          const sectionTop = section.offsetTop - 120;
          if (window.scrollY >= sectionTop) {
            current = item;
          }
        }
      });

      setActiveNav(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-container">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="logo-section">
          <div className="logo-box">
            <img src={logo} alt="ExtraaEdge Logo" />
          </div>

          <div className="logo-text">
            <h1>ExtraaEdge</h1>
            <p>Lead Management & Telecalling CRM System</p>
          </div>
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-btn ${activeNav === item ? "active" : ""}`}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}

          <button
            className="btn-get-started-nav"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h2 className="hero-title">
            Streamline Your Lead Management with <span>ExtraaEdge</span>
          </h2>

          <p>
            A <strong>CRM Solution</strong> for Educational Institutes & Call
            Centers
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => handleNavClick("Features")}
            >
              Learn More
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="mock-dashboard">
            <div className="mock-sidebar"></div>
            <div className="mock-content">
              <img
                src={tableImg}
                alt="CRM Dashboard Preview"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= KEY FEATURES ================= */}
      <section id="features" className="features">
        <h2 className="features-title">Key Features</h2>
        <p className="features-subtitle">
          Powerful tools to streamline your lead management process
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <i className="fa-solid fa-chart-area feature-icon"></i>
            <h4>Lead Dashboard & Reports</h4>
            <p>Track and analyse lead data</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-file-excel feature-icon"></i>
            <h4>Excel Lead Upload</h4>
            <p>Import leads from Excel sheets</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-user-shield feature-icon"></i>
            <h4>Role-Based Access</h4>
            <p>Secure access for Admins, Managers, and Telecallers</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-phone-volume feature-icon"></i>
            <h4>Call Activity Tracking</h4>
            <p>Log calls, follow-ups, and conversations</p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    className={`footer-link ${
                      activeNav === item ? "active" : ""
                    }`}
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>info@extraaedge.com</p>
            <p>+1 234 567 850</p>
          </div>

          <div className="footer-col">
            <h4>Follow Us</h4>
            <p>Facebook · Twitter · LinkedIn · Instagram</p>
          </div>
        </div>

        <div className="footer-bottom">
          © 2024 ExtraaEdge. All Rights Reserved | Privacy Policy | Terms of
          Service
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
