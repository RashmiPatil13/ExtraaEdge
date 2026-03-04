// import { useEffect, useState } from "react";
// import axios from "axios";
// import api from "../utils/api";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     total: 0,
//     assigned: 0,
//     converted: 0,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.href = "/";
//       return;
//     }

//     api
//       .get("/manager/stats")
//       .then((res) => setStats(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="cards">
//       <div className="card">
//         Total Leads <br />
//         <b>{stats.total}</b>
//       </div>
//       <div className="card">
//         Assigned Leads <br />
//         <b>{stats.assigned}</b>
//       </div>
//       <div className="card">
//         Converted Leads <br />
//         <b>{stats.converted}</b>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../utils/api";
import { FaUsers, FaTasks, FaCheckCircle } from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    assigned: 0,
    converted: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    api
      .get("/manager/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="cards">
      <div className="card">
        <div className="icon orange">
          <FaUsers />
        </div>
        <p>Total Leads</p>
        <h2>{stats.total}</h2>
      </div>

      <div className="card">
        <div className="icon blue">
          <FaTasks />
        </div>
        <p>Assigned Leads</p>
        <h2>{stats.assigned}</h2>
      </div>

      <div className="card">
        <div className="icon green">
          <FaCheckCircle />
        </div>
        <p>Converted Leads</p>
        <h2>{stats.converted}</h2>
      </div>
    </div>
  );
}
