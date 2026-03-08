import { useEffect, useState } from "react";
import api from "../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TelecallerDailyBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/telecaller/daily-performance").then((res) => {
      console.log(res.data);
      const d = res.data;

      setData([
        { name: "Converted", value: d.converted || 0 },
        { name: "Followups", value: d.followUp || 0 },
        { name: "Callbacks", value: d.callback || 0 },
        { name: "Cold", value: d.cold || 0 },
      ]);
    });
  }, []);

  return (
    <div className="chart-box">
      <h3>Today Performance</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#ff6b00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
