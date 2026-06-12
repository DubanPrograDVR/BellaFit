import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { checkRutAvailable } from "../lib/auth";
import { useToast } from "../context/ToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./CompleteProfile.css";

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

function formatRut(value) {
  const cleaned = value.replace(/[^0-9kK]/g, "").toUpperCase();
  if (cleaned.length <= 1) return cleaned;
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);
  return body.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
}

function validateTelefono(tel) {
  const digits = tel.replace(/\D/g, "");
  if (digits.startsWith("56") && digits.length === 11) return true;
  if (!digits.startsWith("56") && digits.length === 9) return true;
  return false;
}

export default function CompleteProfile() {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    rut: "",
    fecha_nacimiento: "",
    telefono: "",
    direccion: "",
  });
  const [rutError, setRutError] = useState("");
  const [rutChecking, setRutChecking] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleRutChange = (e) => {
    const formatted = formatRut(e.target.value);
    setForm((prev) => ({ ...prev, rut: formatted }));
    if (error) setError("");
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
    setRutChecking(true);
    const { available } = await checkRutAvailable(form.rut, user?.id);
    setRutChecking(false);
    if (!available) {
      setRutError("Este RUT ya está registrado en otra cuenta");
    } else {
      setRutError("");
    }
  };

  const handleTelefonoChange = (e) => {
    const filtered = e.target.value.replace(/[^0-9+\s\-]/g, "");
    setForm({ ...form, telefono: filtered });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.rut.trim() ||
      !form.fecha_nacimiento ||
      !form.telefono.trim() ||
      !form.direccion.trim()
    ) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!validateRut(form.rut)) {
      setError("El RUT ingresado no es válido");
      return;
    }

    if (!validateTelefono(form.telefono)) {
      setError("El teléfono no es válido. Usa el formato +56 9 1234 5678");
      return;
    }

    setLoading(true);

    // Verificar disponibilidad del RUT
    const rutClean = form.rut.replace(/[.\-]/g, "").trim();
    const { available } = await checkRutAvailable(form.rut, user?.id);
    if (!available) {
      setError("Este RUT ya está registrado en otra cuenta");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        rut: rutClean,
        fecha_nacimiento: form.fecha_nacimiento,
        telefono: form.telefono.trim(),
        direccion: form.direccion.trim(),
      })
      .eq("id", user.id);

    setLoading(false);

    if (updateError) {
      if (updateError.code === "23505") {
        setError("Este RUT ya está registrado en otra cuenta");
      } else {
        setError("Error al guardar datos. Intenta de nuevo.");
      }
      return;
    }

    await refreshProfile();
    showToast("¡Perfil completado exitosamente!");
    navigate("/");
  };

  return (
    <div className="complete-page">
      <div className="complete-card">
        <span className="complete-icon">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <h1>Completa tu Perfil</h1>
        <p className="complete-subtitle">
          Para continuar en BellaFit necesitamos algunos datos adicionales.
          Todos los datos deben ser reales para acceder a beneficios exclusivos.
        </p>
        <div className="complete-line" />

        <form onSubmit={handleSubmit} className="complete-form">
          <div className="complete-row">
            <div className="complete-field">
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
                <span className="complete-field-error">{rutError}</span>
              )}
              {rutChecking && (
                <span className="complete-field-hint">Verificando RUT…</span>
              )}
            </div>
            <div className="complete-field">
              <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
              <input
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                type="date"
                value={form.fecha_nacimiento}
                onChange={handleChange}
              />
              <span className="complete-field-hint">
                🎂 Ingresa tu fecha real para recibir beneficios de cumpleaños
              </span>
            </div>
          </div>

          <div className="complete-row">
            <div className="complete-field">
              <label htmlFor="telefono">Teléfono</label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+56 9 1234 5678"
                value={form.telefono}
                onChange={handleTelefonoChange}
                maxLength={15}
              />
              <span className="complete-field-hint">Ej: +56 9 1234 5678</span>
            </div>
            <div className="complete-field">
              <label htmlFor="direccion">Dirección</label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                placeholder="Tu dirección"
                value={form.direccion}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="complete-error">{error}</p>}

          <button
            type="submit"
            className="complete-submit"
            disabled={loading || !!rutError}>
            {loading ? "Guardando..." : "Completar Perfil"}
          </button>
        </form>

        <p className="complete-note">
          Conectado como <strong>{user?.email}</strong>
        </p>
      </div>
    </div>
  );
}
