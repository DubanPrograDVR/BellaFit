import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { WhatsAppButton } from "@/components/marketing/whatsapp-button";
import { PageHeader } from "@/components/ui/page-header";
import { Schedule } from "@/components/clases/schedule";

export const metadata: Metadata = {
  title: "Clases y Horarios | BellaFit",
  description:
    "Reserva tu clase de Bungee Fitness, Yoga, Pilates o Funcional. Encuentra el horario perfecto en BellaFit.",
};

export default function ClasesPage() {
  return (
    <>
      <Navbar />
      <main className="bf-container" style={{ paddingTop: "var(--header-height)", paddingBottom: "5rem" }}>
        <PageHeader
          eyebrow="Horario Semanal"
          title="Reserva tu"
          titleAccent="clase"
          description="Encuentra el horario perfecto y asegura tu lugar. Bungee Fitness, Yoga, Pilates y entrenamiento Funcional."
        />
        <Schedule />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
