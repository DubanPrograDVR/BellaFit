import "./styles/Navbar.css";
import { elementos_navbar } from "./data/navbarData";

const Navbar = () => {

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            BELLAFIT
          </a>
          <ul className="nav-links">
            {elementos_navbar.map((item, index) => (
              <li key={index}>
                <a href={item.enlace} className={item.clase || ""}>
                  {item.nombre}
                </a>
              </li>
            ))}
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
