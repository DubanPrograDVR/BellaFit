import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import WhatsAppButton from "../components/Home/WhatsAppButton";
import { formacionesData } from "./data/formacionesData";
import "./Formaciones.css";

const Formaciones = () => {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="formaciones-hero">
        <div className="formaciones-hero-overlay" />
        <div className="formaciones-hero-content">
          <span className="formaciones-hero-label">BellaFit Academy</span>
          <h1>Formaciones</h1>
          <p>
            Conviértete en instructora certificada de Bungee Fitness. Elige la
            modalidad que mejor se adapte a ti.
          </p>
          <div className="formaciones-hero-line" />
        </div>
      </section>

      {/* Secciones de formación */}
      <section className="formaciones-section">
        {formacionesData.map((formacion, index) => (
          <div
            key={index}
            className={`formacion-block formacion-${formacion.tipo}`}>
            <div className="formacion-header">
              <span className="formacion-badge">{formacion.badge}</span>
              <h2>{formacion.titulo}</h2>
              <p className="formacion-subtitulo">{formacion.subtitulo}</p>
            </div>

            <div className="formacion-body">
              <div className="formacion-info">
                <p className="formacion-descripcion">{formacion.descripcion}</p>

                <div className="formacion-detalles">
                  {formacion.detalles.map((detalle, i) => (
                    <div key={i} className="formacion-detalle">
                      <span className="detalle-label">{detalle.label}</span>
                      <span className="detalle-valor">{detalle.valor}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="formacion-aprendizajes">
                <h3>¿Qué aprenderás?</h3>
                <ul>
                  {formacion.aprendizajes.map((item, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="formacion-cta-wrapper">
              <a href="#" className="formacion-cta">
                {formacion.cta}
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* CTA final */}
      <section className="formaciones-final-cta">
        <div className="formaciones-final-content">
          <h2>¿Tienes dudas sobre nuestras formaciones?</h2>
          <p>
            Escríbenos y te asesoramos para elegir la formación perfecta para
            ti.
          </p>
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20información%20sobre%20las%20formaciones"
            className="formacion-cta"
            target="_blank"
            rel="noopener noreferrer">
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Formaciones;
