import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import Toast from "../components/Toast/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null); // { id, message, type }
  const timerRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    // Limpia timer anterior si hay uno activo
    if (timerRef.current) clearTimeout(timerRef.current);

    setToast({ id: Date.now(), message, type });

    // Auto-cierre después de 1 segundo
    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 1000);
  }, []);

  const closeToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast debe usarse dentro de ToastProvider");
  return context;
}
