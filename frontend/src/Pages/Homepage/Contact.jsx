import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
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
    <div className="contact-container">
      {/* LEFT SECTION */}
      <div className="contact-left">
        <span className="contact-label">CONTACT</span>
        <h1>
          Get in <br /> touch today
        </h1>
        <p>
          Have questions about our CRM system or need support?
          Fill out the form and our team will respond promptly.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="contact-right">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="field">
              <label>FIRST NAME</label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
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
                value={formData.lastName}
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>MESSAGE</label>
            <textarea
              name="message"
              placeholder="Type your message..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            <span>
              I agree to the <a href="#">privacy policy</a>.
            </span>
          </div>

          <button type="submit">Send message</button>
        </form>

        <div className="address">
          <div>
            <p>101 Flow Street</p>
            <p>New York, NY</p>
            <p>+1 555 000 0000</p>
          </div>
          <div>
            <p>101 Web Lane</p>
            <p>San Francisco, CA</p>
            <p>+1 555 000 0000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
