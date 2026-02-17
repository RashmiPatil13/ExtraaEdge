import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/api";

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
