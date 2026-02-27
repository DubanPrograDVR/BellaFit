import { useState, useEffect, useCallback } from "react";
import "./styles/Navbar.css";
import { elementos_navbar } from "./data/navbarData";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

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

  return (
    <>
      <nav className="navbar">
        <div className="logo-wrapper">
          <a href="/" className="logo">
            <img src="/logo.png" alt="BellaFit" className="logo-img" />
          </a>
        </div>
        <div className="nav-container">
          <ul className={`nav-links${menuOpen ? " active" : ""}`}>
            {elementos_navbar.map((item, index) => (
              <li key={index}>
                <a
                  href={item.enlace}
                  className={item.clase || ""}
                  onClick={closeMenu}>
                  {item.nombre}
                </a>
              </li>
            ))}
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
