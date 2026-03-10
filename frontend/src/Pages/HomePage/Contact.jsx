import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import logo from "../../assets/logo.png";

const Contact = () => {
  const navigate = useNavigate();

  const navItems = ["Home", "Features", "Contact"];
  const [activeNav, setActiveNav] = useState("Contact");

  const handleNavClick = (item) => {
    setActiveNav(item);

    if (item === "Contact") return;

    if (item === "Home") {
      navigate("/");
      return;
    }

    navigate("/"); // fallback
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
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

      {/* ================= CONTACT PAGE ================= */}
      <section className="contact-page">
        <div className="contact-wrapper">
          {/* LEFT */}
          <div className="contact-left">
            <span className="contact-tag">CONTACT</span>
            <h1>
              Get in <br /> touch today
            </h1>
            <p>
              Have questions about our CRM system or need support? Fill out the
              form and our team will respond promptly.
            </p>
          </div>

          {/* RIGHT */}
          <div className="contact-right">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="field">
                  <label>FIRST NAME</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field">
                  <label>LAST NAME</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label>EMAIL</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@website.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>MESSAGE</label>
                <textarea
                  name="message"
                  placeholder="Type your message..."
                  rows="5"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkbox">
                <input
                  type="checkbox"
                  name="agree"
                  onChange={handleChange}
                  required
                />
                <span>
                  I agree to the <a href="#">privacy policy</a>
                </span>
              </div>

              <button type="submit">Send message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
