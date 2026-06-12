import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Crear Cuenta | BellaFit",
  description:
    "Únete a BellaFit y comienza tu transformación. Crea tu cuenta para reservar clases.",
};

export default function RegistroPage() {
  return (
    <AuthShell eyebrow="Únete a BellaFit" title="Crear Cuenta">
      <RegisterForm />
    </AuthShell>
  );
}
