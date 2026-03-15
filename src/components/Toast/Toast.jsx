import "./Toast.css";

export default function Toast({ message, type = "success", onClose }) {
  return (
    <div className={`toast toast-${type}`} role="alert">
      <span className="toast-icon">{type === "success" ? "✓" : "✕"}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Cerrar">
        ✕
      </button>
    </div>
  );
}
