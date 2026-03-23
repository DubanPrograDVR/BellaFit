import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { login, loginWithGoogle } from "../lib/auth";
import { useToast } from "../context/ToastContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.identifier.trim() || !form.password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    const { error: loginError } = await login(form.identifier, form.password);
    setLoading(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    showToast("Has iniciado sesión correctamente");
    navigate("/");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const { error: googleError } = await loginWithGoogle();
    if (googleError) {
      setError(googleError.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* ── Columna izquierda: imagen ── */}
      <div className="login-banner">
        <div className="login-banner-overlay" />
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80"
          alt="BellaFit Studio"
        />
        <div className="login-banner-content">
          <Link to="/" className="login-banner-logo">
            BellaFit
          </Link>
          <p>Tu espacio de bienestar y transformación</p>
        </div>
      </div>

      {/* ── Columna derecha: formulario ── */}
      <div className="login-form-col">
        <div className="login-form-wrapper">
          <Link to="/" className="login-back-btn" aria-label="Volver al inicio">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <img src="/sublogo.png" alt="BellaFit" className="login-sublogo" />
          <span className="login-label">Bienvenida de vuelta</span>
          <h1>Iniciar Sesión</h1>
          <div className="login-line" />

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="identifier">Usuario o Email</label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Tu nombre de usuario o email"
                value={form.identifier}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Contraseña</label>
              <div className="login-input-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <Link to="/recuperar-contrasena" className="login-forgot-link">
              ¿Olvidaste tu contraseña?
            </Link>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <div className="login-divider">
            <span>o</span>
          </div>

          <button
            type="button"
            className="login-google-btn"
            onClick={handleGoogle}
            disabled={googleLoading}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {googleLoading ? "Conectando..." : "Continuar con Google"}
          </button>

          <p className="login-register-link">
            ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
