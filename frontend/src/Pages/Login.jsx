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
      if (email === "admin@gmail.com" && password === "12345678") {
        navigate("/admin");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const role = res.data.role;

      if (role === "manager") navigate("/manager");
      if (role === "telecaller") navigate("/telecaller");
    } catch (err) {
      // alert(err.response.data.message);
      alert(err.response?.data?.message || "Login failed");
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

