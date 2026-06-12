import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Toast.css";

export default function Toast({ message, type = "success", onClose }) {
  return (
    <div className={`toast toast-${type}`} role="alert">
      <span className="toast-icon">
        <FontAwesomeIcon icon={type === "success" ? faCheck : faXmark} />
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Cerrar">
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
