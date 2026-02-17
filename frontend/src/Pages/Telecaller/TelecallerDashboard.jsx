import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Phone, CheckCircle, Clock, XCircle } from "lucide-react";
import "./TelecallerDashboard.css";

const data = [
  { name: "Mon", calls: 45, converted: 2 },
  { name: "Tue", calls: 52, converted: 3 },
  { name: "Wed", calls: 38, converted: 1 },
  { name: "Thu", calls: 65, converted: 5 },
  { name: "Fri", calls: 48, converted: 2 },
  { name: "Sat", calls: 30, converted: 1 },
];

const StatCard = ({ title, value, icon, trend }) => {
  return (
    <div className="stat-card">
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
        {trend && <p className="stat-trend">{trend}</p>}
      </div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
};

const TelecallerDashboard = () => {
  return (
    <div className="dashboard">
      <div className="stats-grid">
        <StatCard
          title="Total Calls Today"
          value="48"
          icon={<Phone />}
          trend="+12% from yesterday"
        />
        <StatCard
          title="Conversions"
          value="5"
          icon={<CheckCircle />}
          trend="Target: 8"
        />
        <StatCard title="Follow Ups Pending" value="12" icon={<Clock />} />
        <StatCard title="Cold Leads" value="3" icon={<XCircle />} />
      </div>

      <div className="chart-card">
        <h3>Weekly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calls" fill="#ea580c" />
            <Bar dataKey="converted" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TelecallerDashboard;
