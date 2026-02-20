import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            BELLAFIT
          </a>
          <ul className="nav-links">
            <li>
              <a href="#clases">Clases</a>
            </li>
            <li>
              <a href="#tienda">Tienda</a>
            </li>
            <li>
              <a href="#formaciones">Formaciones</a>
            </li>
            <li>
              <a href="#nutricion">Nutrición</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
            <li>
              <a href="/login" className="btn-login">
                Iniciar Sesión
              </a>
            </li>
          </ul>
          <div className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
