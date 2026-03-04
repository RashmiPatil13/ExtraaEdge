import { useEffect, useState } from "react";

import api from "../utils/api";

export default function TelecallerReport() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    api
      .get("/telecaller/report")
      .then((res) => setReport(res.data))
      .catch(console.log);
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
          {report.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.status}</td>
              <td>{r.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
