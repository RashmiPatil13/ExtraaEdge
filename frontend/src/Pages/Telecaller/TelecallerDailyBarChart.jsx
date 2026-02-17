import { useEffect, useState } from "react";
import api from "../utils/api";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function TelecallerDailyBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/telecaller/daily-performance").then((res) => {
      const d = res.data;

      setData([
        { name: "Converted", value: d.converted },
        { name: "Followups", value: d.followups },
        { name: "Callbacks", value: d.callbacks },
        { name: "Cold", value: d.cold },
      ]);
    });
  }, []);

  return (
    <div className="chart-box">
      <h3>Today Performance</h3>

      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}
