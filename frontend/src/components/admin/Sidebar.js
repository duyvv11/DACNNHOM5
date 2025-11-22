
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">ADMIN</h2>

      <nav className="nav">
        <NavLink to="/admin" end className="link">Dashboard</NavLink>
        <NavLink to="/admin/users" className="link">Quản lý Người dùng</NavLink>
        <NavLink to="/admin/doctors" className="link">Quản lý Bác sĩ</NavLink>
        <NavLink to="/admin/appointments" className="link">Quản lý Lịch hẹn</NavLink>
        <NavLink to="/admin/hospitals" className="link">Quản lý Bệnh Viện</NavLink>
        <NavLink to="/admin/specializations" className="link">Quản lý Chuyên Khoa</NavLink>
        <NavLink to="/admin/news" className="link">Quản lý Bài Viết</NavLink>
      </nav>
    </aside>
  );
}
