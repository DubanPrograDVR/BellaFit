import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./styles/WhatsAppButton.css";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/56XXXXXXXXX"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contáctanos por WhatsApp">
      <span className="whatsapp-tooltip">¿Necesitas ayuda?</span>
      <div className="whatsapp-icon-wrapper">
        <FontAwesomeIcon icon={faWhatsapp} />
      </div>
    </a>
  );
};

export default WhatsAppButton;
