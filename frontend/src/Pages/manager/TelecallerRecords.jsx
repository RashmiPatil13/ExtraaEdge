// import { useEffect, useState } from "react";
// import axios from "axios";
// import api from "../utils/api";

// export default function TelecallerRecords() {
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   useEffect(() => {
//     api
//       .get("/manager/telecaller-records")
//       .then((res) => setStats(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   // axios
//   //     .get("http://localhost:5000/api/manager/telecaller-records", {
//   //       headers: {
//   //         Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //       },
//   //     })
//   //     .then((res) => setRecords(res.data))
//   //     .catch(console.log);
//   // }, []);

//   const filtered = records.filter((r) =>
//     r._id?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <h2>Telecaller Records</h2>

//       <input
//         className="search"
//         placeholder="Search telecaller..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <table>
//         <thead>
//           <tr>
//             <th>Telecaller ID</th>
//             <th>Total Leads</th>
//             <th>status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map((r, i) => (
//             <tr key={i}>
//               <td>{r._id}</td>
//               <td>{r.total}</td>
//               <td>{r.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function TelecallerRecords() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    api
      .get("/manager/telecaller-records")
      .then((res) => {
        console.log("API RESPONSE:", res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  // useEffect(() => {
  //   api
  //     .get("/manager/telecaller-records")
  //     .then((res) => setRecords(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const filtered = records.filter((r) =>
    r.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>Telecaller Performance</h2>

      <input
        className="search"
        placeholder="Search telecaller..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Leads</th>
            <th>Converted</th>
            <th>Pending</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.total}</td>
              <td>{r.converted}</td>
              <td>{r.pending}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
