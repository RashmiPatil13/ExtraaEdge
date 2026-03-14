import { useEffect, useState } from "react";
import api from "../utils/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import CountUp from "react-countup";
import { saveAs } from "file-saver";
import "./admin.css";

// export default function LeadReports() {
export default function LeadReports({ filter }) {
  // SAFE INITIAL STATES
  const [stats, setStats] = useState({
    total: 0,
    conversionRate: 0,
  });

  const [trend, setTrend] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [daysFilter, setDaysFilter] = useState(7);

  const [leads, setLeads] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const fetchLeads = async () => {
    try {
      const res = await api.get("/manager/leads");

      if (filter === "converted") {
        setLeads(res.data.filter((l) => l.status === "converted"));
      } else {
        setLeads(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [daysFilter]); // refetch when filter changes

  const fetchDashboardData = async () => {
    try {
      const leadsRes = await api.get("/manager/leads");
      const dateRes = await api.get(
        `/manager/date-analytics?days=${daysFilter}`
      );
      const statusRes = await api.get("/manager/statusCount");
      const performanceRes = await api.get("/manager/performance");

      const totalLeads = leadsRes.data.length;

      const converted =
        statusRes.data.find((s) => s.status === "converted")?.count || 0;

      const conversionRate =
        totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(1) : 0;

      setStats({
        total: totalLeads,
        conversionRate,
      });

      setTrend(dateRes.data);

      // convert status -> pie format
      setSourceData(
        statusRes.data.map((item) => ({
          name: item.status,
          value: item.count,
        }))
      );

      setPerformanceData(performanceRes.data);
    } catch (err) {
      console.log("FULL ERROR:", err.response?.data || err.message);
    }
  };

  // EXPORT CSV
  const exportCSV = async () => {
    // const res = await api.get("/manager/leads");
    const res = await api.get("/manager/leads");

    if (filter === "converted") {
      const converted = res.data.filter((l) => l.status === "converted");
      setLeads(converted);
    } else {
      setLeads(res.data);
    }

    const csv = [
      ["Name", "Status", "Phone"],
      ...res.data.map((lead) => [lead.name, lead.status, lead.phone]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "leads_report.csv");
  };
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;

  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);

  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

  return (
    <div className="lead-report-container">
      {/* <h2>Lead Reports</h2> */}
      {/* FILTER + EXPORT */}
      {/* <div style={{ marginBottom: "20px", alignItems: "right" }}>
        <select
          value={daysFilter}
          onChange={(e) => setDaysFilter(e.target.value)}
        >
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>

        <button onClick={exportCSV} style={{ marginLeft: "10px" }}>
          Export CSV
        </button>
      </div> */}
      <div className="report-header">
        <h2>Lead Reports</h2>

        <div className="report-actions">
          <select
            className="filter-select"
            value={daysFilter}
            onChange={(e) => setDaysFilter(e.target.value)}
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>

          <button className="export-btn" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
      </div>
      {/* STAT CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Leads</h4>
          <h2>
            <CountUp end={stats.total} duration={1.5} />
          </h2>
        </div>

        <div className="stat-card">
          <h4>Conversion Rate</h4>
          <h2>
            <CountUp
              end={Number(stats.conversionRate)}
              duration={1.5}
              decimals={1}
            />
            %
          </h2>
        </div>

        <div className="stat-card">
          <h4>Avg. Response Time</h4>
          <h2>2h 15m</h2>
        </div>

        <div className="stat-card">
          <h4>Revenue Generated</h4>
          <h2>₹45.2L</h2>
        </div>
      </div>
      {/* CHARTS */}
      <div className="charts-grid">
        {/* LINE CHART */}
        <div className="chart-card">
          <h4 style={{ margin: "20px" }}>Lead Acquisition Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trend}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="chart-card">
          <h4 style={{ margin: "20px" }}>Leads by Status</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {sourceData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* PERFORMANCE BAR CHART */}
      <div className="chart-card" style={{ marginTop: "30px" }}>
        <h4 style={{ margin: "20px" }}>Telecaller Performance</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
            <Bar dataKey="converted" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ margin: "20px" }}>Leads</h2>
      <div className="table-container">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>

            <tbody>
              {/* {leads.map((l) => ( */}
              {currentLeads.map((l) => (
                <tr key={l._id}>
                  <td>{l.name}</td>
                  <td>{l.mobile}</td>
                  <td>{l.status}</td>
                  <td>{l.assignedTo?.name || "Unassigned"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {/* PREV BUTTON */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT BUTTON */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
