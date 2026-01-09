// import { useState } from "react";
import axios from "axios";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const role = res.data.role;

      if (role === "manager") navigate("/manager");
      if (role === "telecaller") navigate("/telecaller");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Login to your account</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p>
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>

      <div className="auth-right">
        <div>
          <h1>WELCOME BACK!</h1>
          <h2>ExtraaEdge CRM</h2>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "../Pages/auth.css";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleLogin = async () => {
//     setError("");

//     if (!form.email.trim() || !form.password.trim()) {
//       setError("Missing fields");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         form
//       );

//       const role = res.data.user.role;

//       if (role === "manager") navigate("/manager");
//       else if (role === "telecaller") navigate("/telecaller");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">ExtraaEdge CRM</h2>

//         {error && <p className="auth-error">{error}</p>}

//         <input
//           className="auth-input"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//         />

//         <input
//           className="auth-input"
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//         />

//         <button type="button" className="auth-btn" onClick={handleLogin}>
//           Login
//         </button>

//         <div className="auth-footer">
//           Don’t have an account? <Link to="/register">Register</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
