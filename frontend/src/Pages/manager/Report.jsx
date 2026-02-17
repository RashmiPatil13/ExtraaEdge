import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function Report() {
  const [telecallers, setTelecallers] = useState([]);
  const [selectedTelecaller, setSelectedTelecaller] = useState("all");
  const [leads, setLeads] = useState([]);

  // FETCH TELECALLER LIST FOR DROPDOWN
  useEffect(() => {
    api
      .get("/manager/telecallers")
      .then((res) => {
        setTelecallers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/manager/telecaller-leads", {
        params: { telecaller: selectedTelecaller },
      })
      .then((res) => setLeads(res.data))
      .catch((err) => console.log(err));
  }, [selectedTelecaller]);

  // FETCH LEADS BASED ON SELECTED TELECALLER

  // PREPARE CHART DATA DYNAMICALLY
  const chartData = [
    {
      status: "new",
      count: leads.filter((l) => l.status === "new").length,
    },
    {
      status: "followup",
      count: leads.filter((l) => l.status === "followup").length,
    },
    {
      status: "converted",
      count: leads.filter((l) => l.status === "converted").length,
    },
    {
      status: "callback",
      count: leads.filter((l) => l.status === "callback").length,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Leads Report</h2>

      {/* DROPDOWN FILTER */}
      <div className="filter-section" style={{ marginBottom: "20px" }}>
        <label>Select Telecaller: </label>
        <select
          value={selectedTelecaller}
          onChange={(e) => setSelectedTelecaller(e.target.value)}
        >
          <option value="all">All</option>

          {telecallers.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* PIE CHART */}
      <div style={{ marginTop: "30px" }}>
        <h3>Status Wise Pie Chart</h3>

        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* BAR CHART */}
      <div style={{ marginTop: "50px" }}>
        <h3>Status Wise Bar Chart</h3>

        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#2563eb" />
        </BarChart>
      </div>
    </div>
  );
}
