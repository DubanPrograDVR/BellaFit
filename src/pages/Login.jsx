import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../lib/auth";
import { useToast } from "../context/ToastContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Tu contraseña"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <p className="login-register-link">
            ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
