import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { WhatsAppButton } from "@/components/marketing/whatsapp-button";
import { PageHeader } from "@/components/ui/page-header";
import { ProductGrid } from "@/components/tienda/product-grid";

export const metadata: Metadata = {
  title: "Tienda | BellaFit",
  description:
    "Equipos oficiales de Bungee Fitness, ropa deportiva, accesorios, suplementos y gift cards BellaFit.",
};

export default function TiendaPage() {
  return (
    <>
      <Navbar />
      <main
        className="bf-container"
        style={{ paddingTop: "var(--header-height)", paddingBottom: "5rem" }}
      >
        <PageHeader
          eyebrow="Tienda BellaFit"
          title="Equípate para"
          titleAccent="entrenar"
          description="Equipos oficiales, ropa deportiva, accesorios y suplementos seleccionados para acompañar tu entrenamiento."
        />
        <ProductGrid />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
