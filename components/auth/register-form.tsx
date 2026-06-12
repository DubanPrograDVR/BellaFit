"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./auth-forms.module.css";

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

export function validateRut(rut: string): boolean {
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

export function formatRut(value: string): string {
  const cleaned = value.replace(/[^0-9kK]/g, "").toUpperCase();
  if (cleaned.length <= 1) return cleaned;
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);
  return body.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
}

export function validateTelefono(tel: string): boolean {
  const digits = tel.replace(/\D/g, "");
  if (digits.startsWith("56") && digits.length === 11) return true;
  if (!digits.startsWith("56") && digits.length === 9) return true;
  return false;
}

export function RegisterForm() {
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState("");
  const [rutError, setRutError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleRutChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleTelefonoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/[^0-9+\s\-]/g, "");
    setForm({ ...form, telefono: filtered });
    if (error) setError("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const empty = Object.values(form).some((v) => !v.trim());
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
    setError("");
    // El registro real se conecta en la fase de funcionalidad
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.field}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Tu nombre completo"
            value={form.nombre}
            onChange={handleChange}
            autoComplete="name"
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="rut">RUT</label>
            <input
              id="rut"
              name="rut"
              type="text"
              placeholder="12.345.678-9"
              value={form.rut}
              onChange={handleRutChange}
              maxLength={12}
              className={`${styles.input} ${rutError ? styles.inputError : ""}`}
            />
            {rutError ? (
              <span className={styles.fieldError}>{rutError}</span>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
            <input
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              type="date"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              className={styles.input}
            />
            <span className={styles.hint}>
              Ingresa tu fecha real para recibir beneficios de cumpleaños
            </span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
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
              className={styles.input}
            />
            <span className={styles.hint}>Ej: +56 9 1234 5678</span>
          </div>
          <div className={styles.field}>
            <label htmlFor="direccion">Dirección</label>
            <input
              id="direccion"
              name="direccion"
              type="text"
              placeholder="Tu dirección"
              value={form.direccion}
              onChange={handleChange}
              autoComplete="street-address"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="password">Contraseña</label>
            <div className={styles.inputWrap}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className={styles.inputWrap}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repite tu contraseña"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
        </div>

        {form.confirmPassword && form.password !== form.confirmPassword ? (
          <p className={styles.fieldError}>Las contraseñas no coinciden</p>
        ) : null}

        {error ? <p className={styles.error}>{error}</p> : null}

        <Button type="submit" fullWidth size="lg" disabled={!!rutError}>
          Crear Cuenta
        </Button>
      </form>

      <p className={styles.switchLink}>
        ¿Ya tienes cuenta? <Link href="/login">Iniciar Sesión</Link>
      </p>
    </>
  );
}
