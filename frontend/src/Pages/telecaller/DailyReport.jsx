// import { useEffect, useState } from "react";
// import api from "../utils/api";

// export default function DailyReport() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     api.get("/telecaller/daily-report").then((res) => setData(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Daily Report</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Remarks</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((d, index) => (
//             <tr key={index}>
//               <td>{d.name}</td>
//               <td>{d.status}</td>
//               <td>{d.remarks || "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function DailyReport() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await api.get("/telecaller/daily-report");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/telecaller/lead/${id}`);
      alert("Deleted successfully");
      fetchData(); //  auto refresh
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };
  const exportToCSV = () => {
    const headers = ["Name", "Status", "Remarks"];

    const rows = data.map((d) => [d.name, d.status, d.remarks || "-"]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "daily_report.csv");

    document.body.appendChild(link);
    link.click();
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>Daily Report</h2>

        <button
          onClick={exportToCSV}
          style={{
            background: "#ff6b00",
            color: "white",
            border: "none",
            padding: "10px 35px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "700",
            marginRight: "100px",
          }}
        >
          Export
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.status}</td>
                <td>{d.remarks || "-"}</td>

                <td>
                  <button
                    onClick={() => handleDelete(d._id)}
                    style={{
                      background: " hsl(25, 100%, 90%)",

                      fontWeight: "600",
                      color: "#ff6b00",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
