import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { WhatsAppButton } from "@/components/marketing/whatsapp-button";
import { PageHeader } from "@/components/ui/page-header";
import { LinkButton } from "@/components/ui/button";
import { formaciones } from "@/lib/formaciones";
import styles from "./formaciones.module.css";

export const metadata: Metadata = {
  title: "Formaciones | BellaFit",
  description:
    "Certifícate como instructora de Bungee Fitness con BellaFit. Formación presencial en estudio u online desde cualquier lugar.",
};

export default function FormacionesPage() {
  return (
    <>
      <Navbar />
      <main
        className="bf-container"
        style={{ paddingTop: "var(--header-height)", paddingBottom: "5rem" }}
      >
        <PageHeader
          eyebrow="Conviértete en Instructora"
          title="Formaciones"
          titleAccent="BellaFit"
          description="Certifícate como instructora de Bungee Fitness con nuestro programa avalado internacionalmente, en modalidad presencial u online."
        />

        <div className={styles.list}>
          {formaciones.map((f, index) => (
            <article
              key={f.tipo}
              className={`${styles.card} ${index % 2 === 1 ? styles.cardReverse : ""}`}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={f.imagen || "/placeholder.svg"}
                  alt={f.titulo}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.image}
                />
                <span className={styles.badge}>{f.badge}</span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.title}>{f.titulo}</h2>
                <p className={styles.subtitle}>{f.subtitulo}</p>
                <p className={styles.description}>{f.descripcion}</p>

                <dl className={styles.details}>
                  {f.detalles.map((d) => (
                    <div key={d.label} className={styles.detailRow}>
                      <dt>{d.label}</dt>
                      <dd>{d.valor}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className={styles.learnTitle}>Qué aprenderás</h3>
                <ul className={styles.learnList}>
                  {f.aprendizajes.map((a) => (
                    <li key={a}>
                      <Check size={15} aria-hidden /> {a}
                    </li>
                  ))}
                </ul>

                <LinkButton href="/#contacto" size="lg">
                  {f.cta}
                </LinkButton>
              </div>
            </article>
          ))}
        </div>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
