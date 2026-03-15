import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./AuthCallback.css";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setTimeout(() => navigate("/"), 3000);
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="callback-page">
      <div className="callback-card">
        {status === "loading" && (
          <>
            <span className="callback-icon">⏳</span>
            <h2>Verificando tu cuenta...</h2>
            <p>Un momento por favor</p>
          </>
        )}

        {status === "success" && (
          <>
            <span className="callback-icon">✅</span>
            <h2>¡Cuenta verificada!</h2>
            <p>Tu cuenta de BellaFit ha sido activada exitosamente.</p>
            <p className="callback-sub">
              Serás redirigida al inicio en unos segundos...
            </p>
            <Link to="/" className="callback-btn">
              Ir al inicio
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <span className="callback-icon">❌</span>
            <h2>Error de verificación</h2>
            <p>El enlace de verificación es inválido o ha expirado.</p>
            <Link to="/registro" className="callback-btn">
              Volver a registrarse
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
