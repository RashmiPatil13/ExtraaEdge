import { useEffect, useState } from "react";
import api from "../utils/api";

export default function DailyReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/telecaller/daily-report").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Daily Report</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{d.name}</td>
              <td>{d.status}</td>
              <td>{d.remarks || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
