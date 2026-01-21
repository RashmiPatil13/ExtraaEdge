
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// // // // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // // // import Login from "./Pages/Login";
// // // // import Register from "./Pages/Registration";
// // // // import AdminDashboard from "./Pages/AdminDashboard";
// // // // import ManagerDashboard from "./Pages/ManagerDashboard";
// // // // import TelecallerDashboard from "./Pages/TelecallerDashboard";
// // // // import LandingPage from "./Pages/LandingPage";

// // // // function App() {
// // // //   return (
// // // //     <BrowserRouter>
// // // //       <Routes>
// // // //         <Route path="/" element={<LandingPage />} />
// // // //         <Route path="/login" element={<Login />} />
// // // //         <Route path="/register" element={<Register />} />

// // // //         <Route path="/admin" element={<AdminDashboard />} />
// // // //         <Route path="/manager" element={<ManagerDashboard />} />
// // // //         <Route path="/telecaller" element={<TelecallerDashboard />} />
        
// // // //       </Routes>
// // // //     </BrowserRouter>
  
      
// // // //   );
// // // // }

// // // // export default App;
// // // import LandingPage from "./Pages/LandingPage";

// // // function App() {
// // //   return <LandingPage />;
// // //   <Route path="/register" element={<Register />} />

// // // }

// // // export default App;
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import LandingPage from "./Pages/LandingPage";
// // import RegisterPage from "./Pages/Registration";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<LandingPage />} />
// //         <Route path="/register" element={<RegisterPage />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LandingPage from "./Pages/LandingPage";
// import RegisterPage from "./Pages/Registration";
// import Login from "./Pages/Login";
// import AdminDashboard from "./Pages/AdminDashboard";
// import ManagerDashboard from "./Pages/ManagerDashboard";
// import TelecallerDashboard from "./Pages/TelecallerDashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Pages */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<RegisterPage />} />

//         {/* Dashboard Pages */}
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/manager" element={<ManagerDashboard />} />
//         <Route path="/telecaller" element={<TelecallerDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/Registration";
import Contact from "./Pages/Homepage/Contact"; 

// Dashboards
import AdminDashboard from "./Pages/AdminDashboard";
import ManagerDashboard from "./Pages/ManagerDashboard";
import TelecallerDashboard from "./Pages/TelecallerDashboard";

import ContactUs from "./components/ContactUs";  // Import ContactUs component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} /> {/* ✅ CONTACT ROUTE */}

        {/* ================= DASHBOARD ROUTES ================= */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/telecaller" element={<TelecallerDashboard />} />

        <Route path="/contact" element={<ContactUs />} />  {/* Added ContactUs route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
