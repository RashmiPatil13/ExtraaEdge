import { useEffect, useState } from "react";
import axios from "axios";

export default function TelecallerRecords() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/manager/telecaller-records", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setRecords(res.data))
      .catch(console.log);
  }, []);

  const filtered = records.filter((r) =>
    r._id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>Telecaller Records</h2>

      <input
        className="search"
        placeholder="Search telecaller..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Telecaller ID</th>
            <th>Total Leads</th>
            <th>Converted</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, i) => (
            <tr key={i}>
              <td>{r._id}</td>
              <td>{r.total}</td>
              <td>{r.converted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
