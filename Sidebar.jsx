import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Manager</h3>

      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/assign-leads">Assign Leads</NavLink>
      <NavLink to="/telecallers">Telecallers</NavLink>
      <NavLink to="/reports">Reports</NavLink>
    </div>
  );
}
