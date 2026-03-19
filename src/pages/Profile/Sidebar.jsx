import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import useSidebar from "./hooks/useSidebar";

export default function Sidebar({
  profile,
  dbProfile,
  activeSection,
  setActiveSection,
}) {
  const { sections } = useSidebar({ activeSection, setActiveSection });

  return (
    <aside className="perfil-sidebar">
      <div className="perfil-sidebar-header">
        <div className="perfil-avatar-sm">
          {profile.nombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="perfil-sidebar-name">{profile.nombre}</p>
          <p className="perfil-sidebar-plan">
            {dbProfile.roles?.nombre || "cliente"}
          </p>
        </div>
      </div>

      <nav className="perfil-sidebar-nav">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`perfil-sidebar-btn${activeSection === s.id ? " active" : ""}`}
            onClick={() => setActiveSection(s.id)}>
            <span className="perfil-sidebar-icon">
              <FontAwesomeIcon icon={s.icon} />
            </span>
            {s.label}
          </button>
        ))}
      </nav>

      <Link to="/tienda" className="perfil-sidebar-cta">
        <FontAwesomeIcon icon={faBagShopping} /> Comprar productos
      </Link>
    </aside>
  );
}
