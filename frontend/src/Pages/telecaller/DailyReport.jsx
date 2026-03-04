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
      fetchData(); // 🔥 auto refresh table
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Daily Report</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Delete</th> {/* ✅ New column */}
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
  );
}
