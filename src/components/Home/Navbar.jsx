import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import { elementos_navbar } from "./data/navbarData";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../lib/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    closeMenu();
    await logout();
    navigate("/");
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 968) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeMenu]);

  // Close user dropdown on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = () => setUserMenuOpen(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [userMenuOpen]);

  const isRoute = (href) => href.startsWith("/") && !href.startsWith("/#");

  // Filter out "Iniciar Sesión" if user is logged in
  const navItems = user
    ? elementos_navbar.filter((item) => item.enlace !== "/login")
    : elementos_navbar;

  const userName =
    user?.user_metadata?.nombre || user?.email?.split("@")[0] || "Mi Cuenta";

  return (
    <>
      <nav className="navbar">
        <div className="logo-wrapper">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src="/logo.png" alt="BellaFit" className="logo-img" />
          </Link>
        </div>
        <div className="nav-container">
          <ul className={`nav-links${menuOpen ? " active" : ""}`}>
            {navItems.map((item, index) => (
              <li key={index}>
                {isRoute(item.enlace) ? (
                  <Link
                    to={item.enlace}
                    className={item.clase || ""}
                    onClick={closeMenu}>
                    {item.nombre}
                  </Link>
                ) : (
                  <a
                    href={item.enlace}
                    className={item.clase || ""}
                    onClick={closeMenu}>
                    {item.nombre}
                  </a>
                )}
              </li>
            ))}

            {/* User menu when logged in */}
            {user && (
              <li className="nav-user-wrapper">
                <button
                  className="nav-user-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen((prev) => !prev);
                  }}>
                  <span className="nav-user-avatar">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <span className="nav-user-name">{userName}</span>
                </button>

                {userMenuOpen && (
                  <div className="nav-user-dropdown">
                    <Link
                      to="/perfil"
                      className="nav-user-dropdown-item"
                      onClick={closeMenu}>
                      Mi Perfil
                    </Link>
                    <button
                      className="nav-user-dropdown-item"
                      onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
          <div
            className={`menu-toggle${menuOpen ? " active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      {menuOpen && <div className="nav-backdrop" onClick={closeMenu} />}
    </>
  );
};

export default Navbar;
