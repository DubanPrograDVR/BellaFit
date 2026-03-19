import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Home/Navbar";
import "./AdminLayout.css";

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: "📊", end: true },
  { to: "/admin/usuarios", label: "Usuarios", icon: "👥" },
];

export default function AdminLayout() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="admin-loading">
        <span>Cargando…</span>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-title">Panel Admin</div>
          <nav className="admin-sidebar-nav">
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `admin-sidebar-link${isActive ? " active" : ""}`
                }>
                <span className="admin-sidebar-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
