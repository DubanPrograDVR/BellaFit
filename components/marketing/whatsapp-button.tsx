import { MessageCircle } from "lucide-react";
import styles from "./whatsapp-button.module.css";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/56900000000"
      className={styles.float}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contáctanos por WhatsApp"
    >
      <span className={styles.tooltip}>¿Necesitas ayuda?</span>
      <span className={styles.icon}>
        <MessageCircle size={26} fill="currentColor" strokeWidth={0} />
      </span>
    </a>
  );
}
