// import { useEffect, useState } from "react";
// import api from "../utils/api";

// import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

// export default function TelecallerChart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     api
//       .get("/telecaller/stats")

//       .then((res) => {
//         const d = res.data;

//         setData([
//           { name: "Converted", value: d.converted },
//           { name: "Follow-up", value: d.followup },
//           { name: "Callback", value: d.callback },
//           { name: "Cold", value: d.cold },
//         ]);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const COLORS = ["#28a745", "#ffc107", "#17a2b8", "#dc3545"];

//   return (
//     <div className="chart-box">
//       <h3>Performance Chart</h3>

//       <PieChart width={350} height={280}>
//         <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
//           {data.map((entry, index) => (
//             <Cell key={index} fill={COLORS[index]} />
//           ))}
//         </Pie>

//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../utils/api";

import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

export default function TelecallerChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/telecaller/stats")
      .then((res) => {
        const d = res.data;

        setData([
          { name: "Converted", value: d.converted },
          { name: "Follow-ups", value: d.followups },
          { name: "Callbacks", value: d.callbacks },
          { name: "Cold", value: d.cold },
        ]);
      })
      .catch((err) => console.log("Chart Error:", err));
  }, []);

  const COLORS = ["#28a745", "#ffc107", "#17a2b8", "#dc3545"];

  return (
    <div className="chart-box">
      <h3>Performance Chart</h3>

      <PieChart width={350} height={280}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
