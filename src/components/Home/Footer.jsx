import "./styles/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BellaFit</h3>
            <p>
              Centro de Bungee Fitness y Bienestar dedicado a transformar vidas
              a través del movimiento y la nutrición consciente.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                📷
              </a>
              <a href="#" aria-label="Facebook">
                📘
              </a>
              <a href="#" aria-label="TikTok">
                🎵
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Servicios</h3>
            <a href="#clases">Clases Presenciales</a>
            <a href="#online">Clases Online</a>
            <a href="#formaciones">Formaciones</a>
            <a href="#nutricion">Nutrición</a>
            <a href="#tienda">Tienda</a>
          </div>

          <div className="footer-section">
            <h3>Información</h3>
            <a href="#terminos">Términos y Condiciones</a>
            <a href="#privacidad">Política de Privacidad</a>
            <a href="#cancelacion">Política de Cancelación</a>
            <a href="#faq">Preguntas Frecuentes</a>
          </div>

          <div className="footer-section">
            <h3>Contacto</h3>
            <p>📍 Dirección del Estudio</p>
            <p>📞 +56 9 XXXX XXXX</p>
            <p>✉️ hola@bellafit.cl</p>
            <p>
              🕐 Lun - Vie: 7:00 - 21:00
              <br />
              Sáb: 9:00 - 14:00
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2026 BellaFit. Todos los derechos reservados. Diseñado con ♡
            para transformar vidas.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
