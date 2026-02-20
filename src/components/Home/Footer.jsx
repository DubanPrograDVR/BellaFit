import "./styles/Footer.css";
import { footerData } from "./data/footerData";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3>{footerData.about.title}</h3>
            <p>{footerData.about.description}</p>
            <div className="social-links">
              {footerData.about.social.map((social, index) => (
                <a key={index} href={social.href} aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Servicios Section */}
          <div className="footer-section">
            <h3>Servicios</h3>
            {footerData.servicios.map((servicio, index) => (
              <a key={index} href={servicio.enlace}>
                {servicio.nombre}
              </a>
            ))}
          </div>

          {/* Información Section */}
          <div className="footer-section">
            <h3>Información</h3>
            {footerData.informacion.map((info, index) => (
              <a key={index} href={info.enlace}>
                {info.nombre}
              </a>
            ))}
          </div>

          {/* Contacto Section */}
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>{footerData.contacto.direccion}</p>
            <p>{footerData.contacto.telefono}</p>
            <p>{footerData.contacto.email}</p>
            <p>{footerData.contacto.horarios}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {footerData.copyright}</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
