import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { updatePassword } from "../lib/auth";
import "./ResetPassword.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    // Supabase procesa el token del hash automáticamente al detectar PASSWORD_RECOVERY
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Por favor completa ambos campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    const { error: updateError } = await updatePassword(password);
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate("/"), 3000);
  };

  if (success) {
    return (
      <div className="reset-page">
        <div className="reset-banner">
          <div className="reset-banner-overlay" />
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80"
            alt="BellaFit Studio"
          />
          <div className="reset-banner-content">
            <Link to="/" className="reset-banner-logo">
              BellaFit
            </Link>
            <p>Tu espacio de bienestar y transformación</p>
          </div>
        </div>

        <div className="reset-form-col">
          <div className="reset-success">
            <span className="reset-success-icon">✅</span>
            <h2>¡Contraseña actualizada!</h2>
            <p>Tu contraseña ha sido cambiada exitosamente.</p>
            <p className="reset-success-sub">
              Serás redirigida al inicio en unos segundos...
            </p>
            <Link to="/" className="reset-back-btn">
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-page">
      <div className="reset-banner">
        <div className="reset-banner-overlay" />
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80"
          alt="BellaFit Studio"
        />
        <div className="reset-banner-content">
          <Link to="/" className="reset-banner-logo">
            BellaFit
          </Link>
          <p>Tu espacio de bienestar y transformación</p>
        </div>
      </div>

      <div className="reset-form-col">
        <div className="reset-form-wrapper">
          <span className="reset-label">Nueva contraseña</span>
          <h1>Restablecer contraseña</h1>
          <div className="reset-line" />

          {!sessionReady && (
            <p className="reset-desc">
              Procesando tu enlace de recuperación...
            </p>
          )}

          <form onSubmit={handleSubmit} className="reset-form">
            <div className="reset-field">
              <label htmlFor="password">Nueva contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                autoComplete="new-password"
              />
            </div>

            <div className="reset-field">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repite tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                autoComplete="new-password"
              />
            </div>

            {error && <p className="reset-error">{error}</p>}

            <button type="submit" className="reset-submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar nueva contraseña"}
            </button>
          </form>

          <p className="reset-login-link">
            <Link to="/login">← Volver a Iniciar Sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
