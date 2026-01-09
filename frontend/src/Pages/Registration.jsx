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

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Registration</h2>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="telecaller">Telecaller</option>
        </select>

        <button onClick={register}>Register</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>

      <div className="auth-right">
        <div>
          <h1>ExtraaEdge CRM</h1>
          {/* <p>Create your account to continue</p> */}
          <p>Register to access CRM</p>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import axios from "axios";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "telecaller",
//   });

//   const submit = async () => {
//     await axios.post("http://localhost:5000/api/auth/register", form);
//     alert("Registered");
//   };

//   return (
//     <div className="auth-box">
//       <h2>Register</h2>
//       <input
//         placeholder="Name"
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />
//       <input
//         placeholder="Email"
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />

//       <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
//         <option value="manager">Manager</option>
//         <option value="telecaller">Telecaller</option>
//       </select>

//       <button onClick={submit}>Register</button>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "../Pages/auth.css";

// const Registration = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleRegister = async () => {
//     await axios.post("http://localhost:5000/api/auth/register", form);

//     alert("Registration Successful");
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Create Account</h2>
//         <p className="auth-subtitle">Register to access CRM</p>

//         <input
//           className="auth-input"
//           name="name"
//           placeholder="Full Name"
//           onChange={handleChange}
//         />

//         <input
//           className="auth-input"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />

//         <input
//           className="auth-input"
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />

//         <select className="auth-input" name="role" onChange={handleChange}>
//           <option value="">Select Role</option>
//           <option value="manager">Manager</option>
//           <option value="telecaller">Telecaller</option>
//         </select>

//         <button className="auth-btn" onClick={handleRegister}>
//           Register
//         </button>

//         <div className="auth-footer">
//           Already have an account? <Link to="/">Login</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registration;
