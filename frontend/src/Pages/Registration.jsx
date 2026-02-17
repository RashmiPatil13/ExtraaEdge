import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "telecaller",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    // ✅ Frontend Validation
    if (!form.name || !form.email || !form.password || !form.role) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert(res.data.message || "Registered Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Registration</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* ✅ Controlled Dropdown */}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="telecaller">Telecaller</option>
          <option value="manager">Manager</option>
        </select>

        <button onClick={register}>Register</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>

      <div className="auth-right">
        <div>
          <h1>ExtraaEdge CRM</h1>
          <p>Register to access CRM</p>
        </div>
      </div>
    </div>
  );
}