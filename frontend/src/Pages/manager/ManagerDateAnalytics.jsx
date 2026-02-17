import { useEffect, useState } from "react";
import api from "../../utils/api";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function ManagerDateAnalytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/manager/date-analytics").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="chart-box">
      <h3>Date Wise Leads Analytics</h3>

      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="total" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
