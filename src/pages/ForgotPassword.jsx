import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../lib/auth";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    setLoading(true);
    const { error: resetError } = await resetPassword(email.trim());
    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="forgot-page">
        <div className="forgot-banner">
          <div className="forgot-banner-overlay" />
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80"
            alt="BellaFit Studio"
          />
          <div className="forgot-banner-content">
            <Link to="/" className="forgot-banner-logo">
              BellaFit
            </Link>
            <p>Tu espacio de bienestar y transformación</p>
          </div>
        </div>

        <div className="forgot-form-col">
          <div className="forgot-success">
            <span className="forgot-success-icon">📧</span>
            <h2>¡Revisa tu correo!</h2>
            <p>
              Hemos enviado un enlace de recuperación a <strong>{email}</strong>
              .
            </p>
            <p className="forgot-success-sub">
              Haz clic en el enlace del correo para crear una nueva contraseña.
              Si no lo ves, revisa tu carpeta de spam.
            </p>
            <Link to="/login" className="forgot-back-btn">
              Volver a Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-page">
      <div className="forgot-banner">
        <div className="forgot-banner-overlay" />
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80"
          alt="BellaFit Studio"
        />
        <div className="forgot-banner-content">
          <Link to="/" className="forgot-banner-logo">
            BellaFit
          </Link>
          <p>Tu espacio de bienestar y transformación</p>
        </div>
      </div>

      <div className="forgot-form-col">
        <div className="forgot-form-wrapper">
          <span className="forgot-label">Recuperar acceso</span>
          <h1>¿Olvidaste tu contraseña?</h1>
          <div className="forgot-line" />
          <p className="forgot-desc">
            Ingresa el correo electrónico con el que te registraste y te
            enviaremos un enlace para restablecer tu contraseña.
          </p>

          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="forgot-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                autoComplete="email"
              />
            </div>

            {error && <p className="forgot-error">{error}</p>}

            <button type="submit" className="forgot-submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar enlace de recuperación"}
            </button>
          </form>

          <p className="forgot-login-link">
            <Link to="/login">← Volver a Iniciar Sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
