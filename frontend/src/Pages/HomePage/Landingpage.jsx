// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LandingPage.css";
// import logo from "../../assets/logo.png";
// import tableImg from "../../assets/table.png";

// const LandingPage = () => {
//   const [activeNav, setActiveNav] = useState("Home");
//   const navigate = useNavigate();

//   const navItems = ["Home", "Features", "Contact"];

//   const handleNavClick = (item) => {
//     setActiveNav(item);

//     if (item === "Contact") {
//       navigate("/contact");
//       return;
//     }

//     const section = document.getElementById(item.toLowerCase());

//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       let current = "Home";

//       navItems.forEach((item) => {
//         if (item === "Contact") return;

//         const section = document.getElementById(item.toLowerCase());

//         if (section) {
//           const sectionTop = section.offsetTop - 120;

//           if (window.scrollY >= sectionTop) {
//             current = item;
//           }
//         }
//       });

//       setActiveNav(current);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="landing-container">
//       {/* ================= NAVBAR ================= */}

//       <header className="navbar">
//         <div className="logo-section">
//           <div className="logo-box">
//             <img src={logo} alt="ExtraaEdge Logo" />
//           </div>

//           <div className="logo-text">
//             <h1>ExtraaEdge</h1>
//             <p>Lead Management & Telecalling CRM System</p>
//           </div>
//         </div>

//         <nav className="nav-links">
//           {navItems.map((item) => (
//             <button
//               key={item}
//               className={`nav-btn ${activeNav === item ? "active" : ""}`}
//               onClick={() => handleNavClick(item)}
//             >
//               {item}
//             </button>
//           ))}

//           <button className="btn-login" onClick={() => navigate("/login")}>
//             Login
//           </button>
//         </nav>
//       </header>

//       {/* ================= HERO ================= */}

//       <section id="home" className="hero">
//         <div className="hero-content">
//           <h2>
//             Streamline Your <br />
//             Lead Management with <br />
//             ExtraaEdge
//           </h2>

//           <p>
//             A <strong>CRM Solution</strong> for Educational Institutes & Call
//             Centers
//           </p>

//           <div className="hero-buttons">
//             <button
//               className="btn-primary"
//               onClick={() => handleNavClick("Features")}
//             >
//               Learn More
//             </button>

//             <button
//               className="btn-secondary"
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </button>
//           </div>
//         </div>

//         <div className="hero-image">
//           <div className="mock-dashboard">
//             <div className="mock-sidebar"></div>

//             <div className="mock-content">
//               <img
//                 src={tableImg}
//                 alt="CRM Dashboard"
//                 className="dashboard-image"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}

//       {/* <section id="features" className="features">
//         <h2 className="features-title">Key Features</h2>

//         <p className="features-subtitle">
//           Powerful tools to streamline your lead management process
//         </p>

//         <div className="features-grid">
//           <div className="feature-card">
//             <i className="fa-solid fa-chart-area feature-icon"></i>
//             <h4>Lead Dashboard & Reports</h4>
//             <p>Track and analyse lead data</p>
//           </div>

//           <div className="feature-card">
//             <i className="fa-solid fa-file-excel feature-icon"></i>
//             <h4>Excel Lead Upload</h4>
//             <p>Import leads from Excel sheets</p>
//           </div>

//           <div className="feature-card">
//             <i className="fa-solid fa-user-shield feature-icon"></i>
//             <h4>Role-Based Access</h4>
//             <p>Secure access for Admins, Managers, and Telecallers</p>
//           </div>

//           <div className="feature-card">
//             <i className="fa-solid fa-phone-volume feature-icon"></i>
//             <h4>Call Activity Tracking</h4>
//             <p>Log calls, follow-ups, and conversations</p>
//           </div>
//         </div>
//       </section> */}
//       {/* About Section */}
//       <section className="about">
//         <div className="about-left">
//           <h2>Real-World Inspired CRM System</h2>

//           <p>
//             ExtraaEdge CRM is a Lead Management and Telecalling system designed
//             to manage the complete lifecycle of leads from generation to
//             conversion. It supports role-based access for Admin, Manager, and
//             Telecaller, allowing lead uploads, assignments, follow-ups,
//             callbacks, and conversion tracking.
//           </p>

//           <div className="highlights">
//             <h4>Highlights</h4>

//             <ul>
//               <li>✔ Real-time data handling</li>
//               <li>✔ Role-based authentication and authorization</li>
//               <li>✔ REST API development</li>
//               <li>✔ File upload and data processing</li>
//               <li>✔ Dashboard analytics and reporting</li>
//             </ul>
//           </div>
//         </div>

//         <div className="about-right">
//           <div className="info-box">
//             <h3>3</h3>
//             <p>User Roles</p>
//           </div>

//           <div className="info-box">
//             <h3>Secure</h3>
//             <p>Authentication</p>
//           </div>

//           <div className="info-box">
//             <h3>Bulk</h3>
//             <p>Lead Upload</p>
//           </div>

//           <div className="info-box">
//             <h3>Live</h3>
//             <p>Analytics</p>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features">
//         <h2>Key Features</h2>
//         <p>Powerful tools to streamline your lead management process</p>

//         <div className="feature-grid">
//           <div className="feature-card">
//             <div className="icon">📊</div>
//             <h3>Lead Dashboard & Reports</h3>
//             <p>Track and analyse lead data</p>
//           </div>

//           <div className="feature-card">
//             <div className="icon">⬆️</div>
//             <h3>Excel Lead Upload</h3>
//             <p>Import leads from Excel sheets</p>
//           </div>

//           <div className="feature-card">
//             <div className="icon">👥</div>
//             <h3>Role-Based Access</h3>
//             <p>Secure access for Admins, Managers, and Telecallers</p>
//           </div>

//           <div className="feature-card">
//             <div className="icon">📞</div>
//             <h3>Call Activity Tracking</h3>
//             <p>Log calls, follow-ups, and conversations</p>
//           </div>
//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}

//       <footer className="footer">
//         <div className="footer-top">
//           <div className="footer-col">
//             <h4>Quick Links</h4>

//             <ul>
//               {navItems.map((item) => (
//                 <li key={item}>
//                   <button
//                     className="footer-link"
//                     onClick={() => handleNavClick(item)}
//                   >
//                     {item}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="footer-col">
//             <h4>Contact Us</h4>

//             <p>Piyushi Agrawal</p>
//             <p>Rashmi Patil</p>
//             <p>Samruddhi Athare</p>
//             <p>Manjushree Gade</p>
//           </div>

//           <div className="footer-col">
//             <h4>Follow Us</h4>
//             <p>Facebook · Twitter · LinkedIn · Instagram</p>
//           </div>
//         </div>

//         <div className="footer-bottom">
//           © 2024 ExtraaEdge. All Rights Reserved
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import logo from "../../assets/logo.png";
import tableImg from "../../assets/table.png";

const LandingPage = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const navigate = useNavigate();

  const navItems = ["Home", "Features", "Contact"];

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

  /* Highlight menu while scrolling */

  useEffect(() => {
    const handleScroll = () => {
      let current = "Home";

      navItems.forEach((item) => {
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
      {/* NAVBAR */}

      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🛡️</span>

          <div>
            <h2>ExtraaEdge</h2>
            <p>Lead Management & Telecalling CRM System</p>
          </div>
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li
              key={item}
              className={activeNav === item ? "active" : ""}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </li>
          ))}

          <li
            className="login-btn"
            onClick={() => {
              setActiveNav("Login");
              navigate("/login");
            }}
          >
            Login
          </li>
        </ul>
      </nav>
      {/* HERO */}

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>
            Streamline Your <br />
            Lead Management with <br />
            ExtraaEdge
          </h1>

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
          <img src={tableImg} alt="dashboard" />
        </div>
      </section>

      {/* ABOUT */}
      {/* 
      <section className="about">
        <div className="about-left">
          <h2>Real-World Inspired CRM System</h2>

          <p>
            ExtraaEdge CRM is a Lead Management and Telecalling system designed
            to manage the complete lifecycle of leads from generation to
            conversion.
          </p>

          <ul>
            <li> Real-time lead tracking</li>
            <li> Role based authentication</li>
            <li> Dashboard analytics</li>
            <li> Bulk lead upload</li>
          </ul>
        </div>

        <div className="about-right">
          <div className="info-box">
            <h3>3</h3>
            <p>User Roles</p>
          </div>

          <div className="info-box">
            <h3>Secure</h3>
            <p>Authentication</p>
          </div>

          <div className="info-box">
            <h3>Bulk</h3>
            <p>Lead Upload</p>
          </div>

          <div className="info-box">
            <h3>Live</h3>
            <p>Analytics</p>
          </div>
        </div>
      </section> */}

      <section class="about">
        <div class="about-left">
          <h2>Real-World Inspired CRM System</h2>

          <p>
            ExtraaEdge CRM is a Lead Management and Telecalling system designed
            to manage the complete lifecycle of leads from generation to
            conversion. It supports role-based access for Admin, Manager, and
            Telecaller.
          </p>

          <h3 class="highlight-title">Highlights</h3>

          <ul class="highlight-list">
            <li>Real-time data handling</li>
            <li>Role-based authentication and authorization</li>
            <li>REST API development</li>
            <li>File upload and data processing</li>
            <li>Dashboard analytics and reporting</li>
          </ul>
        </div>

        <div class="about-right">
          <div class="info-box">
            <h3 class="orange">3</h3>
            <p>User Roles</p>
          </div>

          <div class="info-box">
            <h3 class="blue">Secure</h3>
            <p>Authentication</p>
          </div>

          <div class="info-box">
            <h3 class="green">Bulk</h3>
            <p>Lead Upload</p>
          </div>

          <div class="info-box">
            <h3 class="purple">Live</h3>
            <p>Analytics</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section id="features" className="features">
        <h2>Key Features</h2>
        <p>Powerful tools to streamline your lead management process</p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Lead Dashboard</h3>
            <p>Track and manage leads in one place</p>
          </div>

          <div className="feature-card">
            <h3>Excel Upload</h3>
            <p>Import thousands of leads easily</p>
          </div>

          <div className="feature-card">
            <h3>Role Based Access</h3>
            <p>Admin, Manager and Telecaller access</p>
          </div>

          <div className="feature-card">
            <h3>Call Tracking</h3>
            <p>Monitor telecaller activity</p>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}

      <footer id="contact" className="footer">
        <div className="footer-section">
          <h3>ExtraaEdge</h3>
          <p>Smart CRM for lead management</p>
        </div>

        <div className="footer-section">
          <h3>Links</h3>
          <p onClick={() => handleNavClick("Home")}>Home</p>
          <p onClick={() => handleNavClick("Features")}>Features</p>
          <p onClick={() => handleNavClick("Contact")}>Contact</p>
        </div>

        <div className="footer-section">
          <h3>Team</h3>
          <p>Piyushi Agrawal</p>
          <p>Rashmi Patil</p>
          <p>Samruddhi Athare</p>
          <p>Manjushree Gade</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
