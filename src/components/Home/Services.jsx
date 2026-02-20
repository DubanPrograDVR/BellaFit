import "./styles/Services.css";

const Services = () => {
  return (
    <>
      <section className="services" id="clases">
        <div className="section-header">
          <p className="section-subtitle">NUESTROS SERVICIOS</p>
          <h2 className="section-title">Descubre Tu Camino al Bienestar</h2>
          <p className="section-description">
            Ofrecemos una variedad de disciplinas diseñadas para transformar tu
            cuerpo y mente, adaptadas a todos los niveles.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🦋</div>
            <h3 className="service-title">Clases Presenciales</h3>
            <p className="service-description">
              Bungee Fitness, Jumping Fitness, Pilates, Yoga y Zumba. Entrena
              con energía en nuestro estudio equipado.
            </p>
            <a href="#clases-presenciales" className="service-link">
              Ver horarios →
            </a>
          </div>

          <div className="service-card">
            <div className="service-icon">💻</div>
            <h3 className="service-title">Clases Online</h3>
            <p className="service-description">
              Accede a clases virtuales exclusivas con tu equipo oficial.
              Entrena desde donde estés.
            </p>
            <a href="#clases-online" className="service-link">
              Más información →
            </a>
          </div>

          <div className="service-card">
            <div className="service-icon">🛍️</div>
            <h3 className="service-title">Tienda</h3>
            <p className="service-description">
              Equipos oficiales, ropa deportiva, accesorios y suplementos. Todo
              lo que necesitas en un solo lugar.
            </p>
            <a href="#tienda" className="service-link">
              Explorar tienda →
            </a>
          </div>

          <div className="service-card">
            <div className="service-icon">📚</div>
            <h3 className="service-title">Formaciones</h3>
            <p className="service-description">
              Certifícate como instructora de Bungee Fitness. Modalidad
              presencial y online disponible.
            </p>
            <a href="#formaciones" className="service-link">
              Inscríbete →
            </a>
          </div>

          <div className="service-card">
            <div className="service-icon">🥗</div>
            <h3 className="service-title">Nutrición</h3>
            <p className="service-description">
              Consultas nutricionales personalizadas, presenciales y online, con
              planes alimentarios diseñados para ti.
            </p>
            <a href="#nutricion" className="service-link">
              Agendar consulta →
            </a>
          </div>

          <div className="service-card">
            <div className="service-icon">🎉</div>
            <h3 className="service-title">Fiestas Privadas</h3>
            <p className="service-description">
              Celebra momentos especiales con una experiencia única. Arrienda
              nuestro espacio para eventos.
            </p>
            <a href="#fiestas" className="service-link">
              Solicitar información →
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
