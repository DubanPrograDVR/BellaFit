import {
  faCalendarDays,
  faChartBar,
  faClipboardCheck,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Home/Navbar";
import "./InstructorLayout.css";

const instructorNav = [
  { to: "/instructor", label: "Calendario", icon: faCalendarDays, end: true },
  { to: "/instructor/asistencia", label: "Asistencia", icon: faClipboardCheck },
  { to: "/instructor/observaciones", label: "Observaciones", icon: faNoteSticky },
  { to: "/instructor/estadisticas", label: "Estadísticas", icon: faChartBar },
];

export default function InstructorLayout() {
  const { isInstructor, loading } = useAuth();

  if (loading) {
    return (
      <div className="inst-loading">
        <span>Cargando…</span>
      </div>
    );
  }

  if (!isInstructor) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="inst-page">
        <aside className="inst-sidebar">
          <div className="inst-sidebar-title">
            <img
              src="/sublogo.png"
              alt="BellaFit"
              className="inst-sidebar-logo"
            />
          </div>
          <nav className="inst-sidebar-nav">
            {instructorNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `inst-sidebar-link${isActive ? " active" : ""}`
                }>
                <span className="inst-sidebar-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="inst-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
