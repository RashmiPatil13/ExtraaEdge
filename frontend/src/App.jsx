import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Registration";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManagerDashboard from "./Pages/manager/ManagerDashboard";
import TelecallerDashboard from "./Pages/telecaller/TelecallerDashboard";
import TelecallerReport from "./Pages/telecaller/TelecallerReport";
import LandingPage from "./Pages/HomePage/Landingpage";
import Contact from "./Pages/HomePage/Contact";
// import Chatbot from "./Pages/HomePage/Chatbot";

function App() {
  return (
    <BrowserRouter>
      {/* <div className="app-container"> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/telecaller" element={<TelecallerDashboard />} />
        <Route path="/telecaller/report" element={<TelecallerReport />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {/* <Chatbot /> */}
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
