import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar Sesión | BellaFit",
  description: "Accede a tu cuenta BellaFit para reservar clases y más.",
};

export default function LoginPage() {
  return (
    <AuthShell eyebrow="Bienvenida de vuelta" title="Iniciar Sesión">
      <LoginForm />
    </AuthShell>
  );
}
