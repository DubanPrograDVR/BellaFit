import {
  faBoxOpen,
  faChartColumn,
  faDumbbell,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Home/Navbar";
import "./AdminLayout.css";

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: faChartColumn, end: true },
  { to: "/admin/usuarios", label: "Usuarios", icon: faUsers },
  { to: "/admin/clases", label: "Clases", icon: faDumbbell },
  { to: "/admin/inventario", label: "Inventario", icon: faBoxOpen },
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
          <div className="admin-sidebar-title">
            <img
              src="/sublogo.png"
              alt="BellaFit"
              className="admin-sidebar-logo"
            />
          </div>
          <nav className="admin-sidebar-nav">
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `admin-sidebar-link${isActive ? " active" : ""}`
                }>
                <span className="admin-sidebar-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
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
