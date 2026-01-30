import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    assigned: 0,
    converted: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/manager/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setStats(res.data))
      .catch(console.log);
  }, []);

  return (
    <div className="cards">
      <div className="card">
        Total Leads <br />
        <b>{stats.total}</b>
      </div>
      <div className="card">
        Assigned Leads <br />
        <b>{stats.assigned}</b>
      </div>
      <div className="card">
        Converted Leads <br />
        <b>{stats.converted}</b>
      </div>
    </div>
  );
}
