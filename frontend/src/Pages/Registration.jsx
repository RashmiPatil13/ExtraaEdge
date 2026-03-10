// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./auth.css";
// import { toast } from "react-toastify";

// export default function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "telecaller",
//   });

//   const register = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", form);
//       // alert("Registered Successfully");
//       toast.success("Registered successfully!");

//       navigate("/login");
//     } catch (err) {
//       // alert(err.response.data.message);
//       toast.error(err.response?.data?.message || "registration Failed!");
//     }
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <div className="logo">
//           <span className="logo-icon">🛡️</span>

//           <div>
//             <h2>ExtraaEdge</h2>
//             <p>Lead Management & Telecalling CRM System</p>
//           </div>
//         </div>

//         <ul className="nav-links">
//           {navItems.map((item) => (
//             <li
//               key={item}
//               className={activeNav === item ? "active" : ""}
//               onClick={() => handleNavClick(item)}
//             >
//               {item}
//             </li>
//           ))}

//           <li
//             className="login-btn"
//             onClick={() => {
//               setActiveNav("Login");
//               navigate("/login");
//             }}
//           >
//             Login
//           </li>
//         </ul>
//       </nav>
//       <div className="auth-container">
//         <div className="auth-left">
//           <h2>Registration</h2>

//           <input
//             type="text"
//             placeholder="Full Name"
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />

//           <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
//             <option value="">Select Role</option>
//             <option value="manager">Manager</option>
//             <option value="telecaller">Telecaller</option>
//           </select>

//           <button onClick={register}>Register</button>

//           <p>
//             Already have an account? <Link to="/">Login</Link>
//           </p>
//         </div>

//         <div className="auth-right">
//           <div>
//             <h1>WELCOME!</h1>
//             <h2>ExtraaEdge CRM</h2>
//             <p>Create your account to continue</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("Register");

  const navItems = ["Home", "Features", "Contact"];

  const handleNavClick = (item) => {
    setActiveNav(item);

    if (item === "Home") navigate("/");
    if (item === "Features") navigate("/features");
    if (item === "Contact") navigate("/contact");
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "telecaller",
  });

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      toast.success("Registered successfully!");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed!");
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

        {/* REGISTER SECTION */}
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

            <select
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="telecaller">Telecaller</option>
            </select>

            <button onClick={register}>Register</button>

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>

          <div className="auth-right">
            <div>
              <h1>WELCOME!</h1>
              <h2>ExtraaEdge CRM</h2>
              <p>Create your account to continue</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
