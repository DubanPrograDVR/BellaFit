import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, checkRutAvailable } from "../lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";

const INITIAL = {
  nombre: "",
  rut: "",
  fecha_nacimiento: "",
  telefono: "",
  direccion: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function validateRut(rut) {
  const cleaned = rut.replace(/[.\-]/g, "");
  if (cleaned.length < 8) return false;
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1).toUpperCase();
  let sum = 0;
  let mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const expected = 11 - (sum % 11);
  const dvExpected =
    expected === 11 ? "0" : expected === 10 ? "K" : String(expected);
  return dv === dvExpected;
}

// Formatea el valor del RUT mientras el usuario escribe: 12.345.678-9
function formatRut(value) {
  const cleaned = value.replace(/[^0-9kK]/g, "").toUpperCase();
  if (cleaned.length <= 1) return cleaned;
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);
  return body.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
}

// Teléfono chileno: +56 9 XXXX XXXX (11 dígitos con código) ó 9XXXXXXXX (9 dígitos sin código)
function validateTelefono(tel) {
  const digits = tel.replace(/\D/g, "");
  if (digits.startsWith("56") && digits.length === 11) return true;
  if (!digits.startsWith("56") && digits.length === 9) return true;
  return false;
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rutError, setRutError] = useState("");
  const [rutChecking, setRutChecking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  // RUT: auto-formatea mientras escribe y valida en tiempo real
  const handleRutChange = (e) => {
    const formatted = formatRut(e.target.value);
    setForm((prev) => ({ ...prev, rut: formatted }));
    if (error) setError("");
    // Valida solo cuando ya tiene suficientes caracteres (cuerpo + dígito)
    const digits = formatted.replace(/[^0-9kK]/g, "");
    if (digits.length >= 2) {
      setRutError(validateRut(formatted) ? "" : "RUT no es válido");
    } else {
      setRutError("");
    }
  };

  const handleRutBlur = async () => {
    if (!form.rut) return;
    if (!validateRut(form.rut)) {
      setRutError("RUT no es válido");
      return;
    }
    // Verificar disponibilidad en la BD
    setRutChecking(true);
    const { available } = await checkRutAvailable(form.rut);
    setRutChecking(false);
    if (!available) {
      setRutError("Este RUT ya está registrado en otra cuenta");
    } else {
      setRutError("");
    }
  };

  // Teléfono: solo dígitos, +, espacios y guión; máx. 15 chars
  const handleTelefonoChange = (e) => {
    const filtered = e.target.value.replace(/[^0-9+\s\-]/g, "");
    setForm({ ...form, telefono: filtered });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    const empty = Object.entries(form).some(([, v]) => !v.trim());
    if (empty) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!validateRut(form.rut)) {
      setError("El RUT ingresado no es válido");
      return;
    }

    if (!validateTelefono(form.telefono)) {
      setError(
        "El teléfono no es válido. Usa el formato +56 9 1234 5678 ó 9 1234 5678",
      );
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    // Verificar RUT disponible antes de crear la cuenta
    const { available } = await checkRutAvailable(form.rut);
    if (!available) {
      setError("Este RUT ya está registrado en otra cuenta");
      setLoading(false);
      return;
    }

    const { error: regError } = await register({
      email: form.email.trim(),
      password: form.password,
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      direccion: form.direccion.trim(),
      rut: form.rut.replace(/[.\-]/g, "").trim(),
      fecha_nacimiento: form.fecha_nacimiento,
    });
    setLoading(false);

    if (regError) {
      setError(regError.message);
      return;
    }

    setSuccess(true);
  };

  // ── Pantalla de éxito: aviso de verificación ──
  if (success) {
    return (
      <div className="register-page">
        <div className="register-banner">
          <div className="register-banner-overlay" />
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80"
            alt="BellaFit Studio"
          />
          <div className="register-banner-content">
            <Link to="/" className="register-banner-logo">
              BellaFit
            </Link>
            <p>Tu espacio de bienestar y transformación</p>
          </div>
        </div>

        <div className="register-form-col">
          <div className="register-success">
            <span className="register-success-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <h2>¡Revisa tu correo!</h2>
            <p>
              Hemos enviado un enlace de verificación a{" "}
              <strong>{form.email}</strong>.
            </p>
            <p className="register-success-sub">
              Haz clic en el enlace del correo para activar tu cuenta en
              BellaFit. Si no lo ves, revisa tu carpeta de spam.
            </p>
            <Link to="/login" className="register-success-btn">
              Ir a Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      {/* ── Columna izquierda: imagen ── */}
      <div className="register-banner">
        <div className="register-banner-overlay" />
        <img
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80"
          alt="BellaFit Studio"
        />
        <div className="register-banner-content">
          <Link to="/" className="register-banner-logo">
            BellaFit
          </Link>
          <p>Tu espacio de bienestar y transformación</p>
        </div>
      </div>

      {/* ── Columna derecha: formulario ── */}
      <div className="register-form-col">
        <div className="register-form-wrapper">
          <span className="register-label">Únete a BellaFit</span>
          <h1>Crear Cuenta</h1>
          <div className="register-line" />

          <form onSubmit={handleSubmit} className="register-form">
            {/* Nombre */}
            <div className="register-field">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre completo"
                value={form.nombre}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            {/* RUT + Fecha nacimiento (fila) */}
            <div className="register-row">
              <div className="register-field">
                <label htmlFor="rut">RUT</label>
                <input
                  id="rut"
                  name="rut"
                  type="text"
                  placeholder="12.345.678-9"
                  value={form.rut}
                  onChange={handleRutChange}
                  onBlur={handleRutBlur}
                  className={rutError ? "input-error" : ""}
                  maxLength={12}
                />
                {rutError && (
                  <span className="register-field-error">{rutError}</span>
                )}
                {rutChecking && (
                  <span className="register-field-hint">Verificando RUT…</span>
                )}
              </div>
              <div className="register-field">
                <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                <input
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  type="date"
                  value={form.fecha_nacimiento}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Teléfono + Dirección (fila) */}
            <div className="register-row">
              <div className="register-field">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={form.telefono}
                  onChange={handleTelefonoChange}
                  autoComplete="tel"
                  maxLength={15}
                />
                <span className="register-field-hint">Ej: +56 9 1234 5678</span>
              </div>
              <div className="register-field">
                <label htmlFor="direccion">Dirección</label>
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  placeholder="Tu dirección"
                  value={form.direccion}
                  onChange={handleChange}
                  autoComplete="street-address"
                />
              </div>
            </div>

            {/* Email */}
            <div className="register-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* Contraseña + Confirmar (fila) */}
            <div className="register-row">
              <div className="register-field">
                <label htmlFor="password">Contraseña</label>
                <div className="register-input-wrap">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="register-eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div className="register-field">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <div className="register-input-wrap">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repite tu contraseña"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="register-eye-btn"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={
                      showConfirmPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }>
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div>
            </div>

            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="register-password-mismatch">
                Las contraseñas no coinciden
              </p>
            )}

            {error && <p className="register-error">{error}</p>}

            <button
              type="submit"
              className="register-submit"
              disabled={loading || !!rutError}>
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>

          <p className="register-login-link">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
