import React, { useEffect, useState } from "react";
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
import api from "../utils/api";

export default function Report() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/manager/statusCount")
      .then((res) => {
        console.log("API DATA:", res.data);
        setData(res.data);
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Leads Report</h2>

      {/* PIE CHART */}
      <div style={{ marginTop: "30px" }}>
        <h3>Status Wise Pie Chart</h3>

        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
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

        <BarChart width={500} height={300} data={data}>
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
