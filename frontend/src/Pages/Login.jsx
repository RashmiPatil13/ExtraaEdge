// import axios from "axios";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./auth.css";
// import api from "./utils/api";
// import { toast } from "react-toastify";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       console.log("LOGIN RESPONSE:", res.data);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("name", res.data.name);

//       if (res.data.role === "admin") {
//         navigate("/admin");
//         toast.success("Login successfully!");
//       } else if (res.data.role === "manager") {
//         navigate("/manager");
//         toast.success("Login successfully!");
//       } else {
//         navigate("/telecaller");
//         toast.success("Login successfully!");
//       }
//     } catch (err) {
//       // alert(err.response?.data?.message || "Login Failed");
//       toast.error(err.response?.data?.message || "Login Failed!");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-left">
//         <h2>Login to your account</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={login}>Login</button>
//         <p>
//           Don’t have an account? <Link to="/register">Sign Up</Link>
//         </p>
//       </div>

//       <div className="auth-right">
//         <div>
//           <h1>WELCOME BACK!</h1>
//           <h2>ExtraaEdge CRM</h2>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";
import api from "./utils/api";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeNav, setActiveNav] = useState("Home");

  const navItems = ["Home", "Features", "Contact"];

  const handleNavClick = (item) => {
    setActiveNav(item);

    if (item === "Home") navigate("/");
    if (item === "Features") navigate("/features");
    if (item === "Contact") navigate("/contact");
  };

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      toast.success("Login successfully!");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else if (res.data.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/telecaller");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed!");
    }
  };

  return (
    <>
      <div className="auth-page">
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

            {/* <li
            className="login-btn"
            onClick={() => {
              setActiveNav("Login");
              navigate("/login");
            }}
          >
            Login
          </li> */}
          </ul>
        </nav>

        {/* LOGIN SECTION */}

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
      </div>
    </>
  );
}
